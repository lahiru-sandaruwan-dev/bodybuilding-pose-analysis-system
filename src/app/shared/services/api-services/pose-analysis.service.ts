import { Injectable } from '@angular/core';
import { DataAccessService } from '../data-access.service';
import { ResourceService } from '../resource.service';

@Injectable({
  providedIn: 'root'
})
export class PoseAnalysisService {

  constructor(
    private dataAccess: DataAccessService,
    private resource: ResourceService
  ) { }

  frontDoubleBicepsAnalysis(body: any) {
    return this.dataAccess.POST(this.resource.posesAnalysis.frontDoubleBicepsAnalysis, body)
      .pipe((response) => { return response; });
  }
}
