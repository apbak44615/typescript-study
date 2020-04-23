import { Q002 } from "./q002";

describe('q002', () => {

    it('should output the data sorted in ascending order by id', () => {
        let testConsole: any = {
            println: () => {},
        };
        spyOn(testConsole, 'println');

        // exercise
        new Q002(testConsole).main();

        // verify
        expect(testConsole.println.calls.count()).toBe(20);
        ["1,伊藤",
        "2,井上",
        "3,加藤",
        "4,木村",
        "5,小林",
        "6,斉藤",
        "7,佐々木",
        "8,佐藤",
        "9,清水",
        "10,鈴木",
        "11,高橋",
        "12,田中",
        "13,中村",
        "14,林",
        "15,松本",
        "16,山口",
        "17,山田",
        "18,山本",
        "19,吉田",
        "20,渡辺"].forEach(str => expect(testConsole.println).toHaveBeenCalledWith(str));
    });
});
