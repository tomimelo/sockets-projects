export class ChartData {
    private months: string[] = ['january', 'february', 'march', 'april', 'may', 'june', 'july'];
    private values: number[] = [0, 0, 0, 0, 0, 0, 0];

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
            }
        }

        return this.getChartData;

    }
}