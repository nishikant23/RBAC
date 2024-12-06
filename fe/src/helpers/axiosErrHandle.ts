// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import { AxiosError } from "axios";

// Custom Type Guard to check if the error is an AxiosError
export const isAxiosErrorType = (error: unknown): error is AxiosError => {
    return (error as AxiosError).isAxiosErrorType !== undefined;
}