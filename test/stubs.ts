'use strict';
import { IQuestion, IPrompter, IPromptCallback } from '../src/prompts/question';
import vscode = require('vscode');

// Dummy implementation to simplify mocking
class TestPrompter implements IPrompter {
    public promptSingle<T>(question: IQuestion): Promise<T> {
        return Promise.resolve(undefined);
    }
    public prompt<T>(questions: IQuestion[]): Promise<{[key: string]: T}> {
        return Promise.resolve(undefined);
    }
    public promptCallback(questions: IQuestion[], callback: IPromptCallback): void {
        callback({});
    }
}

// Bare mock of the extension context for vscode
class TestExtensionContext implements vscode.ExtensionContext {
    subscriptions: { dispose(): any }[];
    workspaceState: vscode.Memento;
    globalState: vscode.Memento;
    extensionPath: string;
    storagePath;

    asAbsolutePath(relativePath: string): string {
        return undefined;
    }
}

// Bare mock of a TextEditor for vscode
class TestTextEditor implements vscode.TextEditor {
    document: vscode.TextDocument;
    selection: vscode.Selection;
    selections: vscode.Selection[];
    options: vscode.TextEditorOptions;
    viewColumn: vscode.ViewColumn;

    edit(callback: (editBuilder: vscode.TextEditorEdit) => void): Thenable<boolean> { return undefined; };
    setDecorations(decorationType: vscode.TextEditorDecorationType, rangesOrOptions: vscode.Range[] | vscode.DecorationOptions[]): void { return undefined; };
    revealRange(range: vscode.Range, revealType?: vscode.TextEditorRevealType): void { return undefined; };
    show(column?: vscode.ViewColumn): void { return undefined; };
    hide(): void { return undefined; };
}

class TestMemento implements vscode.Memento {
    get<T>(key: string, defaultValue?: T): T {
        return undefined;
    }

    update(key: string, value: any): Thenable<void> {
        return Promise.resolve();
    }
}

function createWorkspaceConfiguration(items: {[key: string]: any}): vscode.WorkspaceConfiguration {
    const result: vscode.WorkspaceConfiguration = {
        has(key: string): boolean {
            return items[key] !== 'undefined';
        },
        get<T>(key: string, defaultValue?: T): T {
            let val = items[key];
            if (typeof val === 'undefined') {
                val = defaultValue;
            }
            return val;
        }
    };

    // Copy properties across so that indexer works as expected
    Object.keys(items).forEach((key) => {
        result[key] = items[key];
    });

    return Object.freeze(result);
}

export { TestPrompter, TestExtensionContext, TestTextEditor, TestMemento, createWorkspaceConfiguration };
