import { Q001 } from "./q001";

describe('q001', () => {

    it('should output hello world', () => {
        let testConsole: any = {
            println: () => {},
        };
        spyOn(testConsole, 'println');

        // exercise
        new Q001(testConsole).main();

        // verify
        expect(testConsole.println.calls.count()).toBe(1);
        expect(testConsole.println).toHaveBeenCalledWith("Hello World.");
    });
  });
