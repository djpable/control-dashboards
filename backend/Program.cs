using System;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/api/led", async (int index, string status) =>
{
    var statusText = status.Equals("on", StringComparison.InvariantCultureIgnoreCase) ? "green" : "red";
    var message = $"Controllo {index + 1}: LED {statusText}";
    var result = await ShowMessageBoxAsync(message, statusText);
    return Results.Ok(new { index, status = statusText, result });
});

app.MapGet("/health", () => Results.Ok("ok"));

app.Run("http://localhost:5005");

static Task<string> ShowMessageBoxAsync(string message, string statusText)
{
    var tcs = new TaskCompletionSource<string>();
    var thread = new Thread(() =>
    {
        try
        {
            var icon = statusText.Equals("green", StringComparison.InvariantCultureIgnoreCase)
                ? MessageBoxIcon.Information
                : MessageBoxIcon.Error;

            MessageBox.Show(message, $"LED {statusText.ToUpper()}", MessageBoxButtons.OK, icon);
            tcs.SetResult("shown");
        }
        catch (Exception ex)
        {
            tcs.SetException(ex);
        }
    });

    thread.SetApartmentState(ApartmentState.STA);
    thread.Start();

    return tcs.Task;
}
