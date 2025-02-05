import { Injectable, EventEmitter, TemplateRef } from "@angular/core";

@Injectable()
export class SidebarService {
  private componentList: any[] = [];
  private properties: any = {
    width: "20vw",
    position: "right",
  };
  private header: String;
  private data: any;
  sidebarEvent = new EventEmitter<any>();
  private footerTemplate: TemplateRef<any>;

  addComponent(header: String, component: any, properties: any, data: any) {
    if (this.componentList.length > 0) {
      this.componentList = [];
    }
    this.header = header;
    this.componentList.push(component);
    this.properties = properties;
    this.data = data;
    //extract footer ng-template from component
  }

  setFooterTemplate(footer: TemplateRef<any>) {
    this.footerTemplate = footer;
  }

  removeComponent() {
    this.componentList = [];
    this.properties = {};
    this.header = "";
    this.footerTemplate = null;
  }

  getData() {
    return this.data;
  }

  getComponentList() {
    return this.componentList;
  }

  getProperties() {
    return this.properties;
  }

  getHeader() {
    return this.header;
  }

  getFooterTemplate(): TemplateRef<any> {
    return this.footerTemplate;
  }

  closeSidebar() {
    this.componentList = [];
    this.properties = {};
    this.header = "";
    this.footerTemplate = null;
  }
}
