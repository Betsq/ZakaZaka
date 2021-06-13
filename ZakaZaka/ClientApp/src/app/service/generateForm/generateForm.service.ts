import {Injectable} from "@angular/core";

@Injectable()
export class GenerateFormService{


  constructor() {}

  generate(data: {name: string, param: any}[], file?: FileList) : FormData{
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
  /*
  generate(data: [{name: string, param: any}], file?: FileList) : FormData{
    const formDate = new FormData();
    for(let i = 0; i < data.length; i++){
      formDate.append(data[i].name, JSON.stringify(this.))
    }
    if(file != null){
      formDate.append("file", file[0], file[0].name);
    }

    formDate.append("restaurantFood", JSON.stringify(this.restaurantFood));
    formDate.append("restaurantId", JSON.stringify(this.restaurantId));

    return formDate;
}*/



