import { MunicipioData } from "@/data/municipiosPI";
import { Building2, Users, TrendingUp, Award } from "lucide-react";

interface MunicipalityPopupProps {
  municipio: MunicipioData;
}

export function MunicipalityPopup({ municipio }: MunicipalityPopupProps) {
  return (
    <div className="min-w-[200px] p-1">
      <h3 className="font-bold text-base text-gray-900 border-b pb-2 mb-2">
        {municipio.nome}
      </h3>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Building2 className="h-3.5 w-3.5" />
            <span className="text-xs">Empresas Ativas</span>
          </div>
          <span className="font-semibold text-sm text-green-700">
            {municipio.empresasAtivas.toLocaleString('pt-BR')}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Users className="h-3.5 w-3.5" />
            <span className="text-xs">Empregos</span>
          </div>
          <span className="font-semibold text-sm text-blue-700">
            {municipio.empregos.toLocaleString('pt-BR')}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-600">
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="text-xs">PIB per Capita</span>
          </div>
          <span className="font-semibold text-sm text-purple-700">
            R$ {municipio.pibPerCapita.toLocaleString('pt-BR')}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Award className="h-3.5 w-3.5" />
            <span className="text-xs">IDHM</span>
          </div>
          <span className="font-semibold text-sm text-orange-700">
            {municipio.idhm.toFixed(3)}
          </span>
        </div>
        
        <div className="pt-2 border-t mt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Setor Predominante</span>
            <span className="text-xs font-medium bg-gray-100 px-2 py-0.5 rounded">
              {municipio.setorPredominante}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">População</span>
            <span className="text-xs font-medium">
              {municipio.populacao.toLocaleString('pt-BR')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
