import * as vscode from 'vscode';
import { NodeDependenciesProvider } from './NodeDependenciesProvider';

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
    vscode.commands.registerCommand("treeView.refreshEntry", () =>
      nodeDependenciesProvider.refresh()
    ),
  ]);
}

export function deactivate() {}
