import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TestUser {
  email: string;
  password: string;
  fullName: string;
  role: "admin" | "gestor_publico" | "tecnico_sebrae" | "analista" | "publico";
  organization: string;
}

const testUsers: TestUser[] = [
  {
    email: "admin@teste.com",
    password: "Admin123!",
    fullName: "Administrador Sistema",
    role: "admin",
    organization: "SEBRAE-PI",
  },
  {
    email: "gestor@teste.com",
    password: "Gestor123!",
    fullName: "Maria Gestora",
    role: "gestor_publico",
    organization: "Secretaria de Desenvolvimento",
  },
  {
    email: "tecnico@teste.com",
    password: "Tecnico123!",
    fullName: "João Técnico",
    role: "tecnico_sebrae",
    organization: "SEBRAE-PI",
  },
  {
    email: "analista@teste.com",
    password: "Analista123!",
    fullName: "Ana Analista",
    role: "analista",
    organization: "Observatório MPE",
  },
  {
    email: "publico@teste.com",
    password: "Publico123!",
    fullName: "Carlos Público",
    role: "publico",
    organization: "Cidadão",
  },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const results: { email: string; status: string; error?: string }[] = [];

    for (const user of testUsers) {
      try {
        // Check if user already exists
        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = existingUsers?.users?.find((u) => u.email === user.email);

        if (existingUser) {
          // Update role if user exists
          await supabaseAdmin
            .from("user_roles")
            .upsert(
              { user_id: existingUser.id, role: user.role },
              { onConflict: "user_id" }
            );

          results.push({ email: user.email, status: "already_exists_role_updated" });
          continue;
        }

        // Create new user
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
          user_metadata: {
            full_name: user.fullName,
          },
        });

        if (authError) {
          results.push({ email: user.email, status: "error", error: authError.message });
          continue;
        }

        if (authData.user) {
          // Update profile with organization
          await supabaseAdmin
            .from("profiles")
            .update({ 
              full_name: user.fullName,
              organization: user.organization 
            })
            .eq("user_id", authData.user.id);

          // Update role (trigger creates default 'publico', so we update)
          await supabaseAdmin
            .from("user_roles")
            .update({ role: user.role })
            .eq("user_id", authData.user.id);

          results.push({ email: user.email, status: "created" });
        }
      } catch (err) {
        results.push({ 
          email: user.email, 
          status: "error", 
          error: err instanceof Error ? err.message : "Unknown error" 
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        results,
        credentials: testUsers.map(u => ({
          email: u.email,
          password: u.password,
          role: u.role,
          fullName: u.fullName
        }))
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
