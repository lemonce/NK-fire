[Setup]
AppName={#NameShort}
AppVerName={#NameVersion}
AppPublisher=Or-Change
DefaultDirName={pf}\{#DirName}
DefaultGroupName={#NameLong}
Compression=lzma
SolidCompression=yes
OutputDir=..\output\setup
OutputBaseFilename={#NameShort}_Setup_{#Version}
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

[Icons]
Name: "{group}\{#NameLong}"; Filename: "{app}\{#ExeBasename}.exe"; AppUserModelID: "{#AppUserId}"
Name: "{commondesktop}\{#NameLong}"; Filename: "{app}\{#ExeBasename}.exe"; Tasks: desktopicon; AppUserModelID: "{#AppUserId}"
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\{#NameLong}"; Filename: "{app}\{#ExeBasename}.exe"; Tasks: quicklaunchicon; AppUserModelID: "{#AppUserId}"