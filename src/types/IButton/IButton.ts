export interface IButton {
    type: 'button' | "submit";
    text: string;
    onClick: () => void;
    [rest: string]: unknown;
}