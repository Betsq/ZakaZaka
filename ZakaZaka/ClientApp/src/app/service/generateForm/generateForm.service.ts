﻿import {Injectable} from "@angular/core";

@Injectable({
 providedIn: "root"
})
export class GenerateFormService{
  constructor() {}

  public generate(data: {name: string, param: any}[], file?: FileList) : FormData{
    data = data.concat(data);

    const formDate = new FormData();
    for(let i = 0; i < data.length; i++){
      formDate.append(data[i].name, JSON.stringify(data[i].param));
    }

    if(file != null){
      formDate.append("file", file[0], file[0].name);
    }

    return formDate;
  }
}


