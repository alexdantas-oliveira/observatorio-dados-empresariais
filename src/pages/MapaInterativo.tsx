import { AppLayout } from "@/components/layout/AppLayout";
import { InteractiveMap, MapStats } from "@/components/map";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { setoresStats } from "@/data/municipiosPI";
import { Map, Info } from "lucide-react";

export default function MapaInterativo() {
  return (
    <AppLayout title="Mapa Interativo">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Map className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                Mapa Interativo do Piauí
              </h1>
            </div>
            <p className="text-muted-foreground">
              Visualização geográfica das empresas e indicadores econômicos por município
            </p>
          </div>
          <Badge variant="outline" className="w-fit">
            <Info className="h-3 w-3 mr-1" />
            Dados atualizados em Jan/2026
          </Badge>
        </div>

        {/* Stats Overview */}
        <MapStats />

        {/* Interactive Map */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Distribuição Geográfica</CardTitle>
            <CardDescription>
              Clique nos marcadores para ver detalhes. Use os controles para alternar entre camadas de dados.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <InteractiveMap />
          </CardContent>
        </Card>

        {/* Sectors Distribution */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {setoresStats.map((setor) => (
            <Card key={setor.setor} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-12 rounded-full"
                    style={{ backgroundColor: setor.cor }}
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{setor.setor}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-muted-foreground">
                        {setor.empresas.toLocaleString('pt-BR')} empresas
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {setor.percentual}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {setor.empregos.toLocaleString('pt-BR')} empregos gerados
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Usage Tips */}
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              Dicas de Uso
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>Zoom:</strong> Use a roda do mouse ou os botões +/- para aproximar ou afastar</li>
              <li>• <strong>Camadas:</strong> Alterne entre visualizações de Empresas, PIB, IDHM e Empregos</li>
              <li>• <strong>Clusters:</strong> Ative o agrupamento para ver a distribuição regional</li>
              <li>• <strong>Detalhes:</strong> Clique em qualquer município para ver informações completas</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
