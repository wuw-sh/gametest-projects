export class Symbols {
    public static isSymbols(char: string): boolean[][] {
        switch (char) {
            case "1":
                return this.num1
            case "2":
                return this.num2
            case "3":
                return this.num3
            case "4":
                return this.num4
            case "5":
                return this.num5
            case "6":
                return this.num6
            case "7":
                return this.num7
            case "8":
                return this.num8
            case "9":
                return this.num9
            case "0":
                return this.num0
            case "+":
                return this.addition
            case "-":
                return this.subtraction
            case "*":
                return this.multiplication
            case "/":
                return this.division
            case "^":
                return this.exponent
            case "√":
                return this.squareRoot
            case " ":
                return this.space
            case ".":
                return this.dot
            default:
                return this.space
        }
    }

    public static isSpace(char: string): number {
        switch (char) {
            case "1":
                return 4
            case "2":
                return 6
            case "3":
                return 6
            case "4":
                return 6
            case "5":
                return 6
            case "6":
                return 6
            case "7":
                return 6
            case "8":
                return 6
            case "9":
                return 6
            case "0":
                return 6
            case "+":
                return 4
            case "-":
                return 4
            case "*":
                return 6
            case "/":
                return 6
            case "^":
                return 6
            case "√":
                return 6
            case " ":
                return 5
            case ".":
                return 2
            default:
                return 6
        }
    }

    public static num1: boolean[][] = [
        [!1, !0, !1],
        [!0, !0, !1],
        [!1, !0, !1],
        [!1, !0, !1],
        [!1, !0, !1],
        [!1, !0, !1],
        [!0, !0, !0]
    ]
    public static num2: boolean[][] = [
        [!1, !0, !0, !0, !1],
        [!0, !1, !1, !1, !0],
        [!1, !1, !1, !1, !0],
        [!1, !1, !0, !0, !1],
        [!1, !0, !1, !1, !1],
        [!0, !1, !1, !1, !0],
        [!0, !0, !0, !0, !0]
    ]
    public static num3: boolean[][] = [
        [!1, !0, !0, !0, !1],
        [!0, !1, !1, !1, !0],
        [!1, !1, !1, !1, !0],
        [!1, !1, !0, !0, !1],
        [!1, !1, !1, !1, !0],
        [!0, !1, !1, !1, !0],
        [!1, !0, !0, !0, !1]
    ]
    public static num4: boolean[][] = [
        [!1, !1, !1, !0, !0],
        [!1, !1, !0, !1, !0],
        [!1, !0, !1, !1, !0],
        [!0, !1, !1, !1, !0],
        [!0, !0, !0, !0, !0],
        [!1, !1, !1, !1, !0],
        [!1, !1, !1, !1, !0]
    ]
    public static num5: boolean[][] = [
        [!0, !0, !0, !0, !0],
        [!0, !1, !1, !1, !1],
        [!0, !0, !0, !0, !1],
        [!1, !1, !1, !1, !0],
        [!1, !1, !1, !1, !0],
        [!0, !1, !1, !1, !0],
        [!1, !0, !0, !0, !1]
    ]
    public static num6: boolean[][] = [
        [!1, !1, !0, !0, !1],
        [!1, !0, !1, !1, !1],
        [!0, !1, !1, !1, !1],
        [!0, !0, !0, !0, !1],
        [!0, !1, !1, !1, !0],
        [!0, !1, !1, !1, !0],
        [!1, !0, !0, !0, !1]
    ]
    public static num7: boolean[][] = [
        [!0, !0, !0, !0, !0],
        [!0, !1, !1, !1, !0],
        [!1, !1, !1, !0, !1],
        [!1, !1, !0, !1, !1],
        [!1, !1, !0, !1, !1],
        [!1, !1, !0, !1, !1],
        [!1, !1, !0, !1, !1]
    ]
    public static num8: boolean[][] = [
        [!1, !0, !0, !0, !1],
        [!0, !1, !1, !1, !0],
        [!0, !1, !1, !1, !0],
        [!1, !0, !0, !0, !1],
        [!0, !1, !1, !1, !0],
        [!0, !1, !1, !1, !0],
        [!1, !0, !0, !0, !1]
    ]
    public static num9: boolean[][] = [
        [!1, !0, !0, !0, !1],
        [!0, !1, !1, !1, !0],
        [!0, !1, !1, !1, !0],
        [!1, !0, !0, !0, !0],
        [!1, !1, !1, !1, !0],
        [!1, !1, !1, !0, !1],
        [!1, !0, !0, !1, !1]
    ]
    public static num0: boolean[][] = [
        [!1, !0, !0, !0, !1],
        [!0, !1, !1, !1, !0],
        [!0, !1, !1, !0, !0],
        [!0, !1, !0, !1, !0],
        [!0, !0, !1, !1, !0],
        [!0, !1, !1, !1, !0],
        [!1, !0, !0, !0, !1]
    ]
    public static addition: boolean[][] = [
        [!1, !1, !1],
        [!1, !1, !1],
        [!1, !0, !1],
        [!0, !0, !0],
        [!1, !0, !1],
        [!1, !1, !1],
        [!1, !1, !1]
    ]
    public static subtraction: boolean[][] = [
        [!1, !1, !1],
        [!1, !1, !1],
        [!1, !1, !1],
        [!0, !0, !0],
        [!1, !1, !1],
        [!1, !1, !1],
        [!1, !1, !1]
    ]
    public static multiplication: boolean[][] = [
        [!1, !1, !1, !1, !1],
        [!1, !1, !1, !1, !1],
        [!0, !0, !1, !0, !0],
        [!1, !0, !0, !0, !1],
        [!0, !0, !1, !0, !0],
        [!1, !1, !1, !1, !1],
        [!1, !1, !1, !1, !1]
    ]
    public static division: boolean[][] = [
        [!1, !1, !1, !1, !0],
        [!1, !1, !1, !0, !1],
        [!1, !1, !1, !0, !1],
        [!1, !1, !0, !1, !1],
        [!1, !0, !1, !1, !1],
        [!1, !0, !1, !1, !1],
        [!0, !1, !1, !1, !1]
    ]
    public static exponent: boolean[][] = [
        [!1, !1, !0, !1, !1],
        [!1, !0, !1, !0, !1],
        [!0, !1, !1, !1, !0],
        [!1, !1, !1, !1, !1],
        [!1, !1, !1, !1, !1],
        [!1, !1, !1, !1, !1],
        [!1, !1, !1, !1, !1]
    ]
    public static squareRoot: boolean[][] = [
        [!1, !1, !1, !0, !0],
        [!1, !1, !1, !0, !1],
        [!1, !1, !1, !0, !1],
        [!1, !1, !1, !0, !1],
        [!0, !0, !1, !0, !1],
        [!1, !0, !0, !0, !1],
        [!1, !1, !0, !0, !1],
        [!1, !1, !1, !0, !1]
    ]

    public static space: boolean[][] = [
        [!1, !1, !1, !1, !1],
        [!1, !1, !1, !1, !1],
        [!1, !1, !1, !1, !1],
        [!1, !1, !1, !1, !1],
        [!1, !1, !1, !1, !1],
        [!1, !1, !1, !1, !1],
        [!1, !1, !1, !1, !1]
    ]

    public static dot: boolean[][] = [
        [!1],
        [!1],
        [!1],
        [!1],
        [!1],
        [!1],
        [!0]
    ]
}