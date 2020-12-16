export class PollData {
    
    private votes: number[] = [...new Array(3)].map(n => Math.round(Math.random()*100));

    constructor() {
    }

    getPollData() {
        return [
            { data: this.votes, label: 'How old are you?' }
        ]
    }

    changeValue(option: number) {

        this.votes[option] += 1;
        if(this.votes[option] < 0) {
            this.votes[option] = 0;
        }

        return this.getPollData;

    }
}