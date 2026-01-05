import type { SerializedEditorState } from 'lexical'
import type { BasePayload } from 'payload'

import { getFieldInfo } from '../../utilities/getFieldInfo.js'
import { lexicalToHTML } from '../../utilities/lexicalToHTML.js'

// Mustache doesn't support custom helpers like Handlebars
// Instead, we'll pre-process the data and convert lexical content to HTML before rendering
export const convertEditorContentToHTML = async (
  payload: BasePayload,
  schemaPath: string,
  content: SerializedEditorState,
): Promise<string> => {
  const fieldInfo = getFieldInfo(payload.collections, schemaPath)

  let html = ''
  if (
    fieldInfo &&
    'editor' in fieldInfo &&
    fieldInfo.editor &&
    typeof fieldInfo.editor === 'object' &&
    'editorConfig' in fieldInfo.editor &&
    fieldInfo.editor.editorConfig
  ) {
    if (
      fieldInfo.editor.editorConfig &&
      typeof fieldInfo.editor.editorConfig === 'object' &&
      'features' in fieldInfo.editor.editorConfig &&
      'lexical' in fieldInfo.editor.editorConfig &&
      'resolvedFeatureMap' in fieldInfo.editor.editorConfig
    ) {
      html = await lexicalToHTML(
        content,
        fieldInfo.editor.editorConfig as any, // as SanitizedServerEditorConfig
      )
    }
  }
  return html
}



// Kept for backwards compatibility - now a no-op since Mustache doesn't use helpers
export const registerEditorHelper = (payload: BasePayload, schemaPath: string) => {
  // No-op: Mustache doesn't support custom helpers
  // Data preprocessing is done in convertEditorContentToHTML instead
}
