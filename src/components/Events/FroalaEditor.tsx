import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/third_party/embedly.css";
import "froala-editor/css/third_party/embedly.min.css";
import "froala-editor/css/plugins/code_view.min.css";
import "froala-editor/css/plugins/image_manager.min.css";
import "froala-editor/css/plugins/image.min.css";

import dynamic from "next/dynamic";
import { FC } from "react";
import { FROALA_KEY } from "@/shared/constants";
import { CircularProgress } from "@mui/material";
import { ActionType } from "@/components/Events/Post";

interface Props {
  dispatch: any;
  content: any;
  setIsEdit: any;
  setEditorLoading: any;
}

const FroalaEditorComponent = dynamic(
  async () => {
    const values = await Promise.all([
      import("react-froala-wysiwyg"),
      // @ts-ignore
      import("froala-editor/js/plugins.pkgd.min.js"),
      // @ts-ignore
      import("froala-editor/js/languages/zh_tw.js"),
      // @ts-ignore
      import("froala-editor/js/third_party/embedly.min.js"),

      // @ts-ignore
      import("froala-editor/js/plugins/align.min.js"),
      // @ts-ignore
      import("froala-editor/js/plugins/code_beautifier.min.js"),
      // @ts-ignore
      import("froala-editor/js/plugins/code_view.min.js"),
      // @ts-ignore
      import("froala-editor/js/plugins/font_size.min.js"),
      // @ts-ignore
      import("froala-editor/js/plugins/font_family.min.js"),

      // @ts-ignore
      import("froala-editor/js/plugins/image.min.js"),
      // @ts-ignore
      import("froala-editor/js/plugins/link.min.js"),
      // @ts-ignore
      import("froala-editor/js/plugins/lists.min.js"),
      // @ts-ignore
      import("froala-editor/js/plugins/paragraph_format.min.js"),
      // @ts-ignore
      import("froala-editor/js/plugins/paragraph_style.min.js"),
      // @ts-ignore
      import("froala-editor/js/plugins/url.min.js"),
      // @ts-ignore
      import("froala-editor/js/plugins/entities.min.js"),
      // @ts-ignore
      import("froala-editor/js/plugins/save.min.js"),

      // @ts-ignore
      import("froala-editor/js/plugins/paragraph_style.min.js"),
      // @ts-ignore
      import("froala-editor/js/plugins/colors.min.js"),
      // @ts-ignore
      import("froala-editor/js/plugins/table.min.js"),
      // @ts-ignore
      import("froala-editor/js/plugins/line_breaker.min.js"),
      // @ts-ignore
      import("froala-editor/js/plugins/video.min.js"),

      // @ts-ignore
      import("froala-editor/js/plugins/quick_insert.min.js"),

      // @ts-ignore
      import("froala-editor/js/plugins/image_manager.min.js"),
    ]);

    return values[0];
  },
  {
    loading: () => (
      <div className="w-full h-20 flex justify-center items-center">
        <CircularProgress />
      </div>
    ),
    ssr: false,
  }
);

const FroalaEditor: FC<Props> = (props) => {
  const { dispatch, content, setIsEdit, setEditorLoading } = props;

  return (
    <div className="w-full">
      <FroalaEditorComponent
        model={content}
        config={{
          key: FROALA_KEY,
          quickInsertEnabled: false,
          spellcheck: false,
          placeholderText: "輸入內文",
          heightMin: 550,
          heightMax: 600,
          widthMax: 735,
          width: "100%",
          language: "zh_tw",
          toolbarButtons: [
            ["bold", "italic", "underline", "fontSize", "textColor"],
            ["insertLink", "undo", "redo", "embedly", "html"],
          ],
          // imageUpload: true,
          // imageUploadParam: "image",
          // imageUploadParams: { id: "" },
          // imageUploadMethod: "POST",
          // imageMaxSize: 10000000,
          // imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
          // requestWithCORS: false,
          // imageUploadURL: `${API_URL}/api/froala-image`,
          // imageDefaultWidth: 0,
          // imageDefaultDisplay: "inline",
          // imageEditButtons: [],
          // imageInsertButtons: ["imageBack", "|", "imageUpload", "imageByURL"],
          // videoUpload: false,
          charCounterCount: false,
          wordCounterCount: false,
          attribution: false,
          linkAlwaysBlank: true,
          linkAlwaysNoFollow: true,
          htmlAllowedStyleProps: [
            "font-size",
            "color",
            "width",
            "height",
            "background-color",
          ],
          pasteAllowedStyleProps: ["font-size", "color"],
          codeBeautifierOptions: {
            end_with_newline: true,
            indent_inner_html: true,
            extra_liners:
              "['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol', 'table', 'dl']",
            brace_style: "expand",
            indent_char: "\t",
            indent_size: 1,
            wrap_line_length: 0,
          },
          events: {
            initialized: function () {
              setIsEdit(false);
            },
          },
        }}
        onModelChange={(value: string) => {
          if (value.length !== 0) {
            setIsEdit(true);
          } else {
            setIsEdit(false);
          }
          dispatch({
            type: ActionType.SET_CONTENT,
            payload: { content: value },
          });
        }}
      />
    </div>
  );
};

export default FroalaEditor;
