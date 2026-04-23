param(
  [Parameter(Mandatory=$true)][string]$Component,   # e.g. 'card' (dir name in src/components)
  [Parameter(Mandatory=$true)][string]$TitleName,   # Storybook title segment, e.g. 'Card'
  [Parameter(Mandatory=$true)][string]$DemoPrefix,  # Demo fn prefix, e.g. 'Card' (so CardBackdrop)
  [Parameter(Mandatory=$true)][string]$StoriesVar,  # meta import variable, e.g. 'cardMeta'
  [string[]]$Attrs = @(),     # prop names in camelCase
  [string[]]$AttrDefaults = @(),
  [string[]]$AttrArgTypes = @(),
  [string[]]$AttrBinding  = @(),
  [string[]]$AttrDesc     = @(),
  [string[]]$Methods      = @(),
  [string[]]$MethodDemo   = @(),
  [string[]]$MethodTitle  = @(),
  [string[]]$MethodDesc   = @(),
  [string[]]$Events       = @(),
  [string[]]$EventDemo    = @(),
  [string[]]$EventTitle   = @(),
  [string[]]$EventDesc    = @(),
  # Sub-component overlay: writes into docs/attributes/<FolderPrefix>-<kebab>/, imports from ../../<FileBase>.main, uses <SubTag> and <SubStoriesVar>
  [string]$DocsRoot       = '',                     # which docs dir under src/components/<DocsRoot> (defaults to $Component)
  [string]$FileBase       = '',                     # file base for main/stories import (defaults to "sy-$Component")
  [string]$SubTag         = '',                     # e.g. 'radio-group' for file prefix sy-radio-group-
  [string]$SubTitleSeg    = '',                     # Title path segment, e.g. 'Group Attributes' (if set overrides '<TitleName>/Attributes')
  [string]$FolderPrefix   = '',                     # optional prefix for attribute folder name, e.g. 'group-'
  [string]$SubStoriesVar  = ''                      # stories import var (defaults to $StoriesVar)
)

$docsRootDir = if ($DocsRoot) { $DocsRoot } else { $Component }
$fileBase = if ($FileBase) { $FileBase } else { "sy-$Component" }
$componentFilePrefix = if ($SubTag) { "sy-$SubTag" } else { "sy-$Component" }
$componentTag = if ($SubTag) { $SubTag } else { $Component }
$storiesVarFinal = if ($SubStoriesVar) { $SubStoriesVar } else { $StoriesVar }

$base = "f:\Projects\PersonalProjects\stencil\design-system-light\src\components\$docsRootDir\docs"

function Write-File($path, $content) {
  $dir = Split-Path $path -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  Set-Content -Path $path -Value $content -Encoding UTF8 -NoNewline
  Write-Host "  wrote $path"
}

# Attributes
for ($i = 0; $i -lt $Attrs.Count; $i++) {
  $camel = $Attrs[$i]
  $kebab = [regex]::Replace($camel, '([a-z0-9])([A-Z])', '$1-$2').ToLower()
  $display = (Get-Culture).TextInfo.ToTitleCase(($kebab -replace '-', ' '))
  $defaultVal = if ($i -lt $AttrDefaults.Count) { $AttrDefaults[$i] } else { 'false' }
  $argType = if ($i -lt $AttrArgTypes.Count) { $AttrArgTypes[$i] } else { 'boolean' }
  $desc = if ($i -lt $AttrDesc.Count) { $AttrDesc[$i] } else { "The ``$camel`` attribute." }
  $demoFn = "$DemoPrefix" + (Get-Culture).TextInfo.ToTitleCase($camel.Substring(0,1)) + $camel.Substring(1)

  $dir = Join-Path $base "attributes\$FolderPrefix$kebab"
  $storyPath = Join-Path $dir "$componentFilePrefix-$kebab.stories.tsx"
  $mdxPath = Join-Path $dir "$componentFilePrefix-$kebab.mdx"

  $titlePath = if ($SubTitleSeg) { "$TitleName/$SubTitleSeg/$display" } else { "$TitleName/Attributes/$display" }

  $storyContent = @"
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { $demoFn } from '../../$fileBase.main';
import $storiesVarFinal from '../../$fileBase.stories';

const meta: Meta = {
  title: '$titlePath',
  component: 'sy-$componentTag',
  tags: [],
  render: (args) => $demoFn(args as { ${camel}COLON $argType }),
  argTypes: { ${camel}COLON ${storiesVarFinal}?.argTypes?.${camel} },
  args: { ${camel}COLON $defaultVal },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
"@
  # Fix backticks (powershell escape): above used `: to avoid variable expansion issues. Replace ` with nothing.
  $storyContent = $storyContent -replace 'COLON', ':'

  $mdxContent = @"
import { Canvas, Meta, Controls } from '@storybook/addon-docs/blocks';
import * as AttrStories from './$componentFilePrefix-$kebab.stories';

<Meta of={AttrStories} />

# $display

$desc

<Canvas of={AttrStories.Default} />
<Controls of={AttrStories.Default} />
"@

  Write-File $storyPath $storyContent
  Write-File $mdxPath $mdxContent
}

# Methods
for ($i = 0; $i -lt $Methods.Count; $i++) {
  $kebab = $Methods[$i]
  $ti = (Get-Culture).TextInfo
  $autoCap = $ti.ToTitleCase($kebab.Substring(0,1)) + $kebab.Substring(1)
  $demoFn = if ($i -lt $MethodDemo.Count -and $MethodDemo[$i]) { "$DemoPrefix" + $MethodDemo[$i] } else { "$DemoPrefix" + $autoCap }
  $display = if ($i -lt $MethodTitle.Count -and $MethodTitle[$i]) { $MethodTitle[$i] } else { $autoCap }
  $desc = if ($i -lt $MethodDesc.Count -and $MethodDesc[$i]) { $MethodDesc[$i] } else { "The ``$kebab`` method." }

  $dir = Join-Path $base "methods\$FolderPrefix$kebab"
  $storyPath = Join-Path $dir "$componentFilePrefix-$kebab.stories.tsx"
  $mdxPath = Join-Path $dir "$componentFilePrefix-$kebab.mdx"

  $titlePath = if ($SubTitleSeg) { "$TitleName/$SubTitleSeg/$display" } else { "$TitleName/Methods/$display" }

  $storyContent = @"
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { $demoFn } from '../../$fileBase.main';

const meta: Meta = {
  title: '$titlePath',
  component: 'sy-$componentTag',
  tags: [],
  render: () => $demoFn(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
"@

  $mdxContent = @"
import { Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as MethodStories from './$componentFilePrefix-$kebab.stories';

<Meta of={MethodStories} />

# $display

$desc

<Canvas of={MethodStories.Default} />
"@

  Write-File $storyPath $storyContent
  Write-File $mdxPath $mdxContent
}

# Events
for ($i = 0; $i -lt $Events.Count; $i++) {
  $kebab = $Events[$i]
  $ti = (Get-Culture).TextInfo
  $autoCap = $ti.ToTitleCase($kebab.Substring(0,1)) + $kebab.Substring(1)
  $demoFn = if ($i -lt $EventDemo.Count -and $EventDemo[$i]) { "$DemoPrefix" + $EventDemo[$i] } else { "$DemoPrefix" + $autoCap }
  $display = if ($i -lt $EventTitle.Count -and $EventTitle[$i]) { $EventTitle[$i] } else { $autoCap }
  $desc = if ($i -lt $EventDesc.Count -and $EventDesc[$i]) { $EventDesc[$i] } else { "The ``$kebab`` event." }

  $dir = Join-Path $base "events\$FolderPrefix$kebab"
  $storyPath = Join-Path $dir "$componentFilePrefix-$kebab.stories.tsx"
  $mdxPath = Join-Path $dir "$componentFilePrefix-$kebab.mdx"

  $titlePath = if ($SubTitleSeg) { "$TitleName/$SubTitleSeg/$display" } else { "$TitleName/Events/$display" }

  $storyContent = @"
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { $demoFn } from '../../$fileBase.main';

const meta: Meta = {
  title: '$titlePath',
  component: 'sy-$componentTag',
  tags: [],
  render: () => $demoFn(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
"@

  $mdxContent = @"
import { Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as EventStories from './$componentFilePrefix-$kebab.stories';

<Meta of={EventStories} />

# $display

$desc

<Canvas of={EventStories.Default} />
"@

  Write-File $storyPath $storyContent
  Write-File $mdxPath $mdxContent
}
