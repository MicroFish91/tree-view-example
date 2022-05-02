import * as vscode from 'vscode';
import { Dependency, NodeDependenciesProvider } from './NodeDependenciesProvider';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "treeView" is now active!');

	const rootPath =
    vscode.workspace.workspaceFolders &&
    vscode.workspace.workspaceFolders.length > 0
      ? vscode.workspace.workspaceFolders[0].uri.fsPath
      : undefined;

	if(!rootPath) return;

	const nodeDependenciesProvider = new NodeDependenciesProvider(rootPath);

	vscode.window.registerTreeDataProvider(
    "nodeDependencies",
    nodeDependenciesProvider
  );

	context.subscriptions.concat([
    vscode.commands.registerCommand("treeView.refreshEntry", () => {
      vscode.window.showInformationMessage(`Successfully called refresh.`);
      nodeDependenciesProvider.refresh();
    }),
    vscode.commands.registerCommand('treeView.addEntry', () =>
      vscode.window.showInformationMessage(`Successfully called add entry.`)
    ),
	  vscode.commands.registerCommand('treeView.editEntry', (node: Dependency) =>
      vscode.window.showInformationMessage(`Successfully called edit entry on ${node.label}.`)
    ),
	  vscode.commands.registerCommand('treeView.deleteEntry', (node: Dependency) =>
      vscode.window.showInformationMessage(`Successfully called delete entry on ${node.label}.`)
    )
  ]);
}

export function deactivate() {}
