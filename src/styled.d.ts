import 'styled-components';
import { boolean } from 'yargs';

declare module 'styled-components' {
    export interface DefaultTheme {
        bgColor: string;
        fontColor: string;
        borderColor: string;
        accent: string;
    }
    
}
export default hasError;