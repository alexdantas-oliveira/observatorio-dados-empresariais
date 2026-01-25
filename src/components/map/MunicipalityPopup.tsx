import { MunicipioData, getMesorregiaoColor } from "@/data/municipiosPI";
import { Building2, Users, TrendingUp, Award, MapPin, Factory } from "lucide-react";

interface MunicipalityPopupProps {
  municipio: MunicipioData;
}

export function MunicipalityPopup({ municipio }: MunicipalityPopupProps) {
  const mesorregiaoColor = getMesorregiaoColor(municipio.mesorregiao);
  
  return (
    <div className="min-w-[240px] p-1">
      <div className="flex items-center justify-between border-b pb-2 mb-3">
        <h3 className="font-bold text-base text-gray-900">
          {municipio.nome}
        </h3>
        <span 
          className="text-[10px] font-medium px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: mesorregiaoColor }}
        >
          {municipio.mesorregiao}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Building2 className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs">Empresas Ativas</span>
          </div>
          <span className="font-semibold text-sm text-emerald-700">
            {municipio.empresasAtivas.toLocaleString('pt-BR')}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Factory className="h-3.5 w-3.5 text-red-500" />
            <span className="text-xs">Empresas Inativas</span>
          </div>
          <span className="font-semibold text-sm text-red-600">
            {municipio.empresasInativas.toLocaleString('pt-BR')}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Users className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-xs">Empregos Formais</span>
          </div>
          <span className="font-semibold text-sm text-blue-700">
            {municipio.empregos.toLocaleString('pt-BR')}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-600">
            <TrendingUp className="h-3.5 w-3.5 text-violet-600" />
            <span className="text-xs">PIB per Capita</span>
          </div>
          <span className="font-semibold text-sm text-violet-700">
            R$ {municipio.pibPerCapita.toLocaleString('pt-BR')}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Award className="h-3.5 w-3.5 text-amber-600" />
            <span className="text-xs">IDHM</span>
          </div>
          <span className="font-semibold text-sm text-amber-700">
            {municipio.idhm.toFixed(3)}
          </span>
        </div>
        
        <div className="pt-2 border-t mt-2 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Setor Predominante</span>
            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
              {municipio.setorPredominante}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">População</span>
            <span className="text-xs font-medium text-gray-700">
              {municipio.populacao.toLocaleString('pt-BR')} hab.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
