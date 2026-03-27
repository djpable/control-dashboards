using System;
using System.Windows.Forms;

internal static class Program
{
    [STAThread]
    private static void Main(string[] args)
    {
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);

        string status = args.Length > 0 ? args[0] : "red";
        string message = args.Length > 1 ? args[1] : "Stato LED non specificato";

        var icon = status.Equals("green", StringComparison.InvariantCultureIgnoreCase)
            ? MessageBoxIcon.Information
            : MessageBoxIcon.Error;

        MessageBox.Show(message, $"LED {status.ToUpper()}", MessageBoxButtons.OK, icon);
    }
}
