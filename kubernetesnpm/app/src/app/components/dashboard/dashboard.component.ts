import { Component, OnInit } from '@angular/core';
import { Pys3viewerService } from '../../services/pys3viewer.service';
import { LoginModel, BucketInfoModel} from '../../models/';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public result:BucketInfoModel[];
  public loginModel:LoginModel;
  public inProgress:Boolean;
  public isSuccess: Boolean;
  public isFailed: Boolean;
  public percentComplete: Number;

  constructor(private pys3viewerService: Pys3viewerService) { }

  ngOnInit() {
    this.result = [];
    this.loginModel = new LoginModel();
  }

submitRequest(){

    if(this.loginModel.access_key_id === '' || this.loginModel.secret_access_key === ''){
      alert('Access_key_id and secret_access_key cannot be null!');
      return;
    }

    this.inProgress = true;
    this.percentComplete = 25;

    this.pys3viewerService.postS3bucketRequest(this.loginModel).subscribe((response:BucketInfoModel[])=>{
      this.result= response;
      this.inProgress = false;
      this.percentComplete = 100;
      this.isSuccess = true;

    },this.handleError,
    this.handleCompleted);
  
}

private handleError(error: any):Promise<any>{
  console.error('An Error has occured: ', error);
  this.inProgress=false;
  this.isFailed=true;
  this.percentComplete=100;
  return Promise.reject(error.message || error);
}

private handleCompleted(){
  console.log('Response Received!');
  this.inProgress = false;
  this.isSuccess=true;
  this.percentComplete=100;
}
}
