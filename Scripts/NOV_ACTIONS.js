function Test1()
{
  var explorer;
  var notepad;
  var wndNotepad;
  var edit;
  var dlgSaveAs;
  explorer = Sys.Process("explorer");
  explorer.Window("CabinetWClass", "NovemberWebinar").Window("ShellTabWindowClass", "NovemberWebinar").Window("DUIViewWndClassName").UIAObject("Explorer_Pane").Window("CtrlNotifySink", "", 3).Window("SHELLDLL_DefView", "ShellView").UIAObject("Items_View").UIAObject("git").Keys("[Win]");
  explorer.Window("ClassicShell.CMenuContainer").Window("Edit").Keys("notepa[Down][Enter]");
  notepad = Sys.Process("notepad");
  wndNotepad = notepad.Window("Notepad");
  edit = wndNotepad.Window("Edit");
  edit.Click(23, 21);
  wndNotepad.Click(19, 47);
  wndNotepad.Click(57, 42);
  wndNotepad.Click(109, 41);
  wndNotepad.Click(145, 37);
  wndNotepad.Click(175, 36);
  edit.Click(676, 119);
  edit.Click(53, 25);
  edit.Keys("test input");
  wndNotepad.MainMenu.Click("File|Save");
  dlgSaveAs = notepad.Window("#32770", "Save As");
  dlgSaveAs.Window("DUIViewWndClassName").UIAObject("Explorer_Pane").Window("FloatNotifySink", "", 1).Window("ComboBox").Window("Edit").Keys("test");
  dlgSaveAs.Window("Button", "&Save").ClickButton();
  wndNotepad.MainMenu.Click("File|Exit");
}