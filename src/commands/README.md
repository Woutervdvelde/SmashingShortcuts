# Command structure
Every command is placed in it's own folder, this allows the user to easily delete or install commands. The filstructure of a command should be as followed:

```
FOLDER  
    | command.js           -> main command file
    | subcommands           -> folder including all subcommands
        | subcommand1.js 
        | subcommand2.js
    | package.json          -> package.json for required dependencies
    | README.md             -> |OPTIONAL| description
```

A command should have the following properties (take the `add` command for example):
```
{
    name: 'add'                         -> name of the command
    aliases: ['a', 'create']            -> possible aliases for the command
    usage: 'adds a new shortcut'        -> short description, 
                                            will be visisble in typehinting.
    description: 'this command adds a new shortcut, 
    
}