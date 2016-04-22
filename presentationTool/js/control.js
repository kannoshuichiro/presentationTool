/*********変数*********/
var setTime = [];//グローバル変数：チャプター毎の時間
var slidePath = [];//グローバル変数：スライド画像のパス
var myPlayer = videojs('vjs_video_3_html5_api');//videoのidをvideojsに予め格納
var whereYouAt;//グローバル変数：現在の動画経過時間
var v = document.getElementById('vjs_video_3_html5_api');//addEventListener用にvideoのidを取得


// jsonファイルからスライドの切り替わり時間とスライド画像パスを取得
httpObj = new XMLHttpRequest();
httpObj.open("get", "../presentationTool/json/jsondata.txt", true);//スライドの切り替わり時間、パスを定義したjsonファイルを呼び出す
httpObj.onload = function(){
  myData = JSON.parse(this.responseText);
  for (var i=0; i<myData.item.length; i++){
    setTime[i] = myData.item[i].setTime;//スライドの切り替わり時間を配列に格納する
    slidePath[i] =myData.item[i].slidePath;//スライドのパスを配列に格納する
  }
}
httpObj.send(null);

/******************イベント処理******************/
v.addEventListener("timeupdate",getTime,false);//timeupdateイベント発生時、getTime関数を呼び出して、現在時刻を返す
v.addEventListener("timeupdate",setSlide,false);//timeupdateイベント発生時、setSlide関数を呼び出す


/******************関数******************/
//現在の経過時間を取得する
function getTime(){
  myPlayer.ready(function(){
      whereYouAt = myPlayer.currentTime(); 
  });
}

//スライドの設定関数setSlide
function setSlide(){
  if(whereYouAt >= setTime[2]){//動画の現在経過時間がチャプター3の設定時間を過ぎている場合
    document.getElementById('slide').innerHTML = "<img src ="+slidePath[2]+">"; //スライドをチャプター３のスライドに変更する
  }
  else if(whereYouAt >= setTime[1]){//動画の現在経過時間がチャプター２の設定時間を過ぎている場合
    document.getElementById('slide').innerHTML = "<img src ="+slidePath[1]+">";//スライドをチャプター２のスライドに変更する       
  }
  else if(whereYouAt >= setTime[0]){//動画の現在経過時間がチャプター１の設定時間を過ぎている場合
    document.getElementById('slide').innerHTML = "<img src ="+slidePath[0]+">";//スライドをチャプター１のスライドに変更する       
  }
}

//チャプター変更ボタンの機能関数findChapter
function findChapter(number){

  if(number == 1)//チャプター１のボタンを選択した場合
  myPlayer.currentTime(setTime[0]);//動画をチャプター１の開始時間にシークする
  else if(number == 2)//チャプター２のボタンを選択した場合
  myPlayer.currentTime(setTime[1]);//動画をチャプター２の開始時間にシークする
  else if(number == 3)//チャプター３のボタンを選択した場合
  myPlayer.currentTime(setTime[2]);//動画をチャプター３の開始時間にシークする

}






