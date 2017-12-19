[Setup]
AppName={#NameShort}
AppVerName={#NameVersion}
AppPublisher=Or-Change
DefaultDirName={pf}\{#DirName}
DefaultGroupName={#NameLong}
Compression=lzma
SolidCompression=yes
OutputDir=..\output\setup
OutputBaseFilename={#NameShort}Setup_{#Version}
AppVersion={#Version}
VersionInfoVersion={#Version}
LicenseFile=license.rtf

[Files]
Source: "..\output\nk-fire-win32-ia32\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[InstallDelete]
Type: filesandordirs; Name: {app}\resources\app\app
Type: filesandordirs; Name: {app}\resources\app\node_modules

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; OnlyBelowVersion: 0,6.1
Name: "addcontextmenufolders"; Description: "add context menu for folders"

[Icons]
Name: "{group}\{#NameLong}"; Filename: "{app}\{#ExeBasename}.exe"; AppUserModelID: "{#AppUserId}"
Name: "{commondesktop}\{#NameLong}"; Filename: "{app}\{#ExeBasename}.exe"; Tasks: desktopicon; AppUserModelID: "{#AppUserId}"
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\{#NameLong}"; Filename: "{app}\{#ExeBasename}.exe"; Tasks: quicklaunchicon; AppUserModelID: "{#AppUserId}"

[Registry]
Root: HKCU; Subkey: "SOFTWARE\Classes\directory\shell\{#RegValueName}"; ValueType: expandsz; ValueName: ""; ValueData: "Open with {#NameShort}"; Tasks: addcontextmenufolders; Flags: uninsdeletekey
Root: HKCU; Subkey: "SOFTWARE\Classes\directory\shell\{#RegValueName}"; ValueType: expandsz; ValueName: "Icon"; ValueData: "{app}\{#ExeBasename}.exe"; Tasks: addcontextmenufolders
Root: HKCU; Subkey: "SOFTWARE\Classes\directory\shell\{#RegValueName}\command"; ValueType: expandsz; ValueName: ""; ValueData: """{app}\{#ExeBasename}.exe"" ""%V"""; Tasks: addcontextmenufolders
Root: HKCU; Subkey: "SOFTWARE\Classes\directory\background\shell\{#RegValueName}"; ValueType: expandsz; ValueName: ""; ValueData: "Open with {#NameShort}"; Tasks: addcontextmenufolders; Flags: uninsdeletekey
Root: HKCU; Subkey: "SOFTWARE\Classes\directory\background\shell\{#RegValueName}"; ValueType: expandsz; ValueName: "Icon"; ValueData: "{app}\{#ExeBasename}.exe"; Tasks: addcontextmenufolders
Root: HKCU; Subkey: "SOFTWARE\Classes\directory\background\shell\{#RegValueName}\command"; ValueType: expandsz; ValueName: ""; ValueData: """{app}\{#ExeBasename}.exe"" ""%V"""; Tasks: addcontextmenufolders
Root: HKCU; Subkey: "SOFTWARE\Classes\Drive\shell\{#RegValueName}"; ValueType: expandsz; ValueName: ""; ValueData: "Open with {#NameShort}"; Tasks: addcontextmenufolders; Flags: uninsdeletekey
Root: HKCU; Subkey: "SOFTWARE\Classes\Drive\shell\{#RegValueName}"; ValueType: expandsz; ValueName: "Icon"; ValueData: "{app}\{#ExeBasename}.exe"; Tasks: addcontextmenufolders
Root: HKCU; Subkey: "SOFTWARE\Classes\Drive\shell\{#RegValueName}\command"; ValueType: expandsz; ValueName: ""; ValueData: """{app}\{#ExeBasename}.exe"" ""%V"""; Tasks: addcontextmenufolders