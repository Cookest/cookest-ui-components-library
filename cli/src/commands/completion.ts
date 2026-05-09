import chalk from 'chalk';
import { componentNames } from '../registry.js';

const COMMANDS = ['init', 'list', 'add', 'diff', 'completion'];
const COMPONENTS = componentNames.join(' ');

function bashScript(): string {
  return `# Cookest UI — bash completion
# Add to ~/.bashrc or ~/.bash_profile:
#   eval "$(cookest-ui completion bash)"

_cookest_ui_completion() {
  local cur="\${COMP_WORDS[COMP_CWORD]}"
  local prev="\${COMP_WORDS[COMP_CWORD-1]}"
  local words="\${COMP_WORDS[*]}"

  case "$prev" in
    cookest-ui)
      COMPREPLY=( $(compgen -W "${COMMANDS.join(' ')}" -- "$cur") )
      ;;
    add|diff)
      COMPREPLY=( $(compgen -W "${COMPONENTS}" -- "$cur") )
      ;;
    completion)
      COMPREPLY=( $(compgen -W "bash zsh fish" -- "$cur") )
      ;;
  esac

  # Support multiple components after 'add' or 'diff'
  case "\${COMP_WORDS[1]}" in
    add|diff)
      COMPREPLY=( $(compgen -W "${COMPONENTS}" -- "$cur") )
      ;;
  esac
}

complete -F _cookest_ui_completion cookest-ui
`;
}

function zshScript(): string {
  const componentEntries = componentNames
    .map((n) => `'${n}'`)
    .join('\n    ');

  return `#compdef cookest-ui
# Cookest UI — zsh completion
# Add to ~/.zshrc:
#   eval "$(cookest-ui completion zsh)"

_cookest_ui() {
  local -a commands components

  commands=(
    'init:Initialize Cookest UI in the current project'
    'list:List all available components'
    'add:Add one or more components to your project'
    'diff:Show which local files differ from the registry'
    'completion:Generate shell completion script'
  )

  components=(
    ${componentEntries}
  )

  _arguments -C \\
    '(-h --help)'{-h,--help}'[Show help]' \\
    '(-v --version)'{-v,--version}'[Show version]' \\
    '1: :->command' \\
    '*: :->args'

  case $state in
    command)
      _describe 'command' commands
      ;;
    args)
      case \$words[2] in
        add|diff)
          _describe 'component' components
          ;;
        completion)
          local -a shells
          shells=('bash:Bash completion script' 'zsh:Zsh completion script' 'fish:Fish completion script')
          _describe 'shell' shells
          ;;
      esac
      ;;
  esac
}

_cookest_ui "$@"
`;
}

function fishScript(): string {
  const componentCompletions = componentNames
    .map(
      (n) =>
        `complete -c cookest-ui -n "__fish_seen_subcommand_from add diff" -a "${n}"`,
    )
    .join('\n');

  return `# Cookest UI — fish completion
# Add to Fish config:
#   cookest-ui completion fish | source
# Or save to a file:
#   cookest-ui completion fish > ~/.config/fish/completions/cookest-ui.fish

complete -c cookest-ui -f

# Commands
complete -c cookest-ui -n "not __fish_seen_subcommand_from init list add diff completion" \\
  -a init -d "Initialize Cookest UI in the current project"
complete -c cookest-ui -n "not __fish_seen_subcommand_from init list add diff completion" \\
  -a list -d "List all available components"
complete -c cookest-ui -n "not __fish_seen_subcommand_from init list add diff completion" \\
  -a add -d "Add one or more components to your project"
complete -c cookest-ui -n "not __fish_seen_subcommand_from init list add diff completion" \\
  -a diff -d "Show which local files differ from the registry"
complete -c cookest-ui -n "not __fish_seen_subcommand_from init list add diff completion" \\
  -a completion -d "Generate shell completion script"

# Shell names for 'completion'
complete -c cookest-ui -n "__fish_seen_subcommand_from completion" -a "bash zsh fish"

# Components for 'add' and 'diff'
${componentCompletions}
`;
}

export function runCompletion(shell?: string) {
  const detected = shell ?? process.env.SHELL?.split('/').pop() ?? 'bash';

  switch (detected) {
    case 'bash':
      process.stdout.write(bashScript());
      break;
    case 'zsh':
      process.stdout.write(zshScript());
      break;
    case 'fish':
      process.stdout.write(fishScript());
      break;
    default:
      console.error(chalk.red(`  Unknown shell: ${detected}`));
      console.error(chalk.dim('  Supported: bash  zsh  fish'));
      console.error(chalk.dim('\n  Usage:\n'));
      console.error(chalk.dim('    eval "$(cookest-ui completion bash)"'));
      console.error(chalk.dim('    eval "$(cookest-ui completion zsh)"'));
      console.error(chalk.dim('    cookest-ui completion fish | source\n'));
      process.exit(1);
  }
}
