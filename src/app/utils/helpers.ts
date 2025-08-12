import { MatSnackBar } from "@angular/material/snack-bar";

export function __messageSnackBar(snackBar: MatSnackBar, message: any, duration?: number): void {
    if (typeof(message) == 'undefined') message = "Ocurrió un error."
    if (typeof(duration) == 'undefined') duration = 7000;
    snackBar.open(message, 'Cerrar', {
        duration          : duration,
        horizontalPosition: "end",
        verticalPosition  : "top"
    });
}