$tier2 = @('card','flex','global-header','inline-message','modeless','nav','pagination','popconfirm','popover','progress-bar','progress-circular','radio','select','skeleton','slider','spinner','split-panel','steps','switch','tabs','tag','textarea','toast','tooltip','tree','tree-select')
$out = @()
foreach ($c in $tier2) {
  $out += "=== $c ==="
  Get-ChildItem "src\components\$c" -Filter "sy-*.tsx" -File | ForEach-Object {
    $out += "--- $($_.Name) ---"
    $lines = Get-Content $_.FullName
    for ($i=0; $i -lt $lines.Count; $i++) {
      if ($lines[$i] -match '^\s*@(Prop|Method|Event)\(') {
        $decl = ''
        if ($i+1 -lt $lines.Count) { $decl = $lines[$i+1].Trim() }
        $out += ("{0}  ||  {1}" -f $lines[$i].Trim(), $decl)
      }
    }
  }
}
$out | Out-File -FilePath tier2-decorators.txt -Encoding utf8
