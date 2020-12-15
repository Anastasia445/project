import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { children } from '../children.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-children',
  templateUrl: './edit-children.component.html',
  styleUrls: ['./edit-children.component.css']
})
export class EditChildrenComponent implements OnInit {

  records: children[];
  Record: children;
  isReady:boolean;
  url="assets/profile.png";

  constructor(
    private location: Location,
    private MainService: MainService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.viewChild();
  }

  onSelectFile(file){
    if(file.target.files){
      let reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload=(event:any)=>{
      this.url=event.target.result;
      }
    }
  }

  viewChild():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.MainService.getChildById(id)
      .subscribe(Records => {this.Record = Records;
        console.log('viewByID2',Records);
      });
  }

  update(){
    this.MainService.updateChild(this.Record).subscribe(/*(data)=>{*/
      //this.location.back()
      /*data => { 
    //  this.isLoading = false;
    //   const newvalue = data ? this.groups.findIndex(h => h.id === data.id) : -1;
   //   if (newvalue > -1) {
   //     this.groups[newvalue] = data;
      }
    }*/   /*}*/   )
  }
  
  close(): void {
    this.location.back();
  }
/*
 "id": 20,
        "email": null,
        "firstName": "Aaaaaaleks",
        "lastName": "2342r",
        "patronymic": "e",
        "dayOfBirth": "2020-12-24",
        "weightF": "44",
        "heightF": "98",
        "weightS": "47",
        "heightS": "99",
        "comment": "fgfdh",
        "groupOfHealth": "one",
        "diet": true,
        "cityR": "dfg",
        "streetR": "hgf",
        "houseR": "123",
        "flatR": "34",
        "telephoneR": "33-33-22",
        "cityL": "gdg",
        "streetL": "sgsd",
        "houseL": "132",
        "flatL": "22",
        "telephoneL": "32-11-34",
        "brothersAndSisters": [],
        "parents": [
            {
                "firstName": "childrenFor2",
                "lastName": "childrenFor2",
                "patronymic": "childrenFor2",
                "education": "fdg",
                "placeOfWork": "gfhgh",
                "position": "gfhg",
                "telephone": "234-34-32"
            },
            {
                "firstName": "childrenFor23",
                "lastName": "childrenFor23",
                "patronymic": "childrenFor23",
                "education": "fdg2",
                "placeOfWork": "gfhgh2",
                "position": "gfhg2",
                "telephone": "244-34-32"
            }
        ],
        "cause": [],
        "roles": [
            {
                "id": 1,
                "name": "ROLE_USER"
            }
        ],
        "group": [
            {
                "id": 6,
                "name": "newGroup",
                "description": "some information",
                "start": null,
                "end": null,
                "groupssTypee": {
                    "id": 1,
                    "name": "JUNIOR_FIRST"
                }
            }
        ]
    }
    */
}
