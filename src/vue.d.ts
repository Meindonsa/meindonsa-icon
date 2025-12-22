declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        'si-icon': {
            name: string;
            size?: string | number;
            color?: string;
            class?: string;
        };
    }
}

declare namespace JSX {
    interface IntrinsicElements {
        'si-icon': {
            name: string;
            size?: string | number;
            color?: string;
            class?: string;
        };
    }
}