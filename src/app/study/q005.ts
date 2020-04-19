import { IQuestion, TestConsole, Question, TestFile, FileData } from '../study.service';

/**
 * 作業時間管理クラス
 * 自由に修正してかまいません
 */
class WorkData {
    /** 社員番号 */
    private number: string[] = [];

    /** 部署 */
    private department: string[] = [];

    /** 役職 */
    private position: string[] = [];

    /** Pコード */
    private pCode: string[] = [];

    /** 作業時間(分) */
    private workTime: string[] = [];

    public constructor(content: string){
        let data = content.split("\n");
        for ( let i=1; i<data.length ; i++){
            this.number.push(data[i].split(",")[0]);
            this.department.push(data[i].split(",")[1]);
            this.position.push(data[i].split(",")[2]);
            this.pCode.push(data[i].split(",")[3]);
            this.workTime.push(data[i].split(",")[4]);
        }
    }

    public getNumberTime(){
        const uniqueNumbers = this.number.filter((x, i, a) => a.indexOf(x) == i)
        let time = [];
        let result : string = "";
        for ( let k=0; k<uniqueNumbers.length;k++){
            let sum = 0;
            for ( let i=0; i<this.number.length;i++){
                if ( this.number[i] == uniqueNumbers[k] ){
                    sum += Number(this.workTime[i]);
                }    
            }
            var hours = Math.floor(sum / 60);  
            var minutes = sum % 60;
            time.push(hours + "時間" + minutes + "分");
        }
        for ( let i=0; i<time.length; i++ ){
            result += uniqueNumbers[i] + ":" + time[i] + "\n";
        }
        return result;
    }

    public getPositionTime(){
        const uniquePosition = this.position.filter((x, i, a) => a.indexOf(x) == i)
        let time = [];
        let result : string = "";
        for ( let k=0; k<uniquePosition.length;k++){
            let sum = 0;
            for ( let i=0; i<this.position.length;i++ ){
                if ( this.position[i] == uniquePosition[k] ){
                    sum += Number(this.workTime[i]);
                }    
            }
            var hours = Math.floor(sum / 60);  
            var minutes = sum % 60;
            time.push(hours + "時間" + minutes + "分");
        }
        for ( let i=0; i<time.length; i++ ){
            result += uniquePosition[i] + ":" + time[i] + "\n";
        }
        return result;
    }

    public getpCodeTime(){
        const unique_pCode = this.pCode.filter((x, i, a) => a.indexOf(x) == i)
        let time = [];
        let result : string = "";
        for ( let k=0; k<unique_pCode.length;k++){
            let sum = 0;
            for ( let i=0; i<this.pCode.length;i++){
                if ( this.pCode[i] == unique_pCode[k] ){
                    sum += Number(this.workTime[i]);
                }    
            }
            var hours = Math.floor(sum / 60);  
            var minutes = sum % 60;
            time.push(hours + "時間" + minutes + "分");
        }
        for ( let i=0; i<time.length; i++ ){
            result += unique_pCode[i] + ":" + time[i] + "\n";
        }
        
        return result;
    }
}

/**
 * Q005 データクラスと様々な集計
 *
 * 以下のファイルを読み込んで、WorkDataクラスのインスタンスを作成してください。
 * assets/q005.txt
 * (先頭行はタイトルなので読み取りをスキップする)
 *
 * 読み込んだデータを以下で集計して出力してください。
 * (1) 役職別の合計作業時間
 * (2) Pコード別の合計作業時間
 * (3) 社員番号別の合計作業時間
 * 上記項目内での出力順は問いません。
 *
 * 作業時間は "xx時間xx分" の形式にしてください。
 * また、WorkDataクラスは自由に修正してください。
 *
[出力イメージ]
部長: xx時間xx分
課長: xx時間xx分
一般: xx時間xx分
Z-7-31100: xx時間xx分
I-7-31100: xx時間xx分
T-7-30002: xx時間xx分
（省略）
194033: xx時間xx分
195052: xx時間xx分
195066: xx時間xx分
（省略）
 */
@Question("様々なフィールドで集計")
export class Q005 implements IQuestion {
    constructor(private testConsole: TestConsole) {
    }
    @TestFile("q005.txt")
    private fileData: FileData;

    async main() {
        // TestConsoleを使って出力してください
        var data = new WorkData(this.fileData.content);
        this.testConsole.println(data.getNumberTime().toString());
        this.testConsole.println(data.getPositionTime().toString());
        this.testConsole.println(data.getpCodeTime().toString());
    }
}
// 完成までの時間: xx時間 xx分