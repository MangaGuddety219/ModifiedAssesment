import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild ,OnInit} from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-videoscreen',
  templateUrl: './videoscreen.component.html',
  styleUrls: ['./videoscreen.component.scss']
})
export class VideoscreenComponent implements OnInit{

  authtoken="";
  // bookmarks:any=[];

@ViewChild('videoPlayer') videoplayer: any;
bookmarks: { id: number, timestamp: number }[] = [];
public startedPlay:boolean = false;
public show:boolean = false;
videos:any= [];
newArray:any=[];
headers: HttpHeaders | undefined;

constructor(private http:HttpClient,private serv:AuthService){

}
ngOnInit():void{

  this.getvideolinks();

}

pauseVideo(videoplayer:any)
{
  videoplayer.nativeElement.play();
  
     setTimeout(() =>
     {
      videoplayer.nativeElement.pause();
       if(videoplayer.nativeElement.paused)
      {
        this.show = !this.show;
      }
     }, 5000);
  
}

getvideolinks(){
  this.headers = new HttpHeaders({
    'Authorization': `Bearer ${this.serv.authtoken}`
  });

  this.http.get("http://localhost:3000/api/videos",{ 'headers': this.headers }).subscribe((data:any)=>{
    console.log("data",data);
    this.videos=data.videos;
    

  })
}





video(id:any){
  this.getbookmarks(id);
  this.newArray=this.videos.filter((eachItem:any)=>{
    if(eachItem.id == id){
      return eachItem
    }
  });
}

bookmark(i:any) {
  const currentTime = this.videoplayer.nativeElement.currentTime;
  const id = i;
  if (id) {
    this.bookmarks.push({ id:id, timestamp: currentTime });
  }
}

jumpToBookmark(time: number) {
  this.videoplayer.nativeElement.currentTime = time;
  this.videoplayer.nativeElement.play();
}

savebookmarks(id:any){
  const videoId=id;
  const timestamp={timestamp:this.videoplayer.nativeElement.currentTime};
  const bearertoken=this.serv.authtoken;
  this.serv.postVideoWithTimestamp(videoId,timestamp,bearertoken).subscribe((data:any)=>{
  });
}

getbookmarks(id:any){
  this.headers = new HttpHeaders({
    'Authorization': `Bearer ${this.serv.authtoken}`
  });

  this.http.get(`http://localhost:3000/api/videos/bookmarks${id}`,{ 'headers': this.headers }).subscribe((data:any)=>{
    this.bookmarks=data.bookmarks;
  })
}


}
