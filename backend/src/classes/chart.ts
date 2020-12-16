export class ChartData {
    private months: string[] = ['january', 'february', 'march', 'april', 'may', 'june', 'july'];
    private values: number[] = [...new Array(7)].map(n => Math.round(Math.random()*100));

    constructor() {

    }

    getChartData() {
        return [
            { data: this.values, label: 'Sales' }
        ]
    }

    changeValue(month: string, value: number) {
        month = month.toLowerCase().trim();

        for(let i in this.months){
            if (this.months[i] === month) {
                this.values[i] += value;
                if(this.values[i] < 0) {
                    this.values[i] = 0
                }
            }
        }

        return this.getChartData;

    }
}