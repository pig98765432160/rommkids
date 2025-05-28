import { Autocomplete, TextField } from "@mui/material";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useDebounce from "@/hooks/useDebounce";
import { ActionType } from "@/components/Events/Post";
import { EStatus } from "@/shared/types/Status";
import { errorAlert } from "@/helpers/baseAxios";
interface Props {
  dispatch: Dispatch<any>;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
}

const Tags: FC<Props> = (props) => {
  const { dispatch, setIsEdit } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  const [tags, setTags] = useState<any>([]);

  return (
    <div className="w-full flex items-center gap-2 my-3">
      <span className="hidden md:inline-block w-[84px] font-bold">
        標籤Tag：
      </span>

      <Autocomplete
        sx={{
          flex: 1,
          "& input": {
            fontSize: "0.875rem",
            padding: "0.875rem",
          },
          "& .MuiInputBase-root": {
            "@media (min-width: 640px)": {
              padding: "0.5rem",
            },
          },
        }}
        disableClearable
        freeSolo
        multiple
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        value={tags}
        id="tags"
        options={[]}
        filterSelectedOptions
        getOptionDisabled={(option) =>
          tags.length === 10 || tags.includes(option) ? true : false
        }
        getOptionLabel={(data: any) => (data ? data.name : data)}
        onChange={(_e, newValue) => {
          let newArr: { id: string; name: string }[] = [];
          newValue.map((item: any) => {
            if (typeof item === "string") {
              if (item.length > 50) {
                errorAlert("標籤長度不可超過50字");
                return;
              }
              newArr.push({
                id: "",
                name: item,
              });
            } else {
              newArr.push({
                id: item.id.toString(),
                name: item.name,
              });
            }
          });

          setTags(newArr);
          const transformedArray = newArr.map((item: any) => item.name);

          dispatch({
            type: ActionType.SET_TAGS,
            payload: {
              tags: transformedArray,
            },
          });
          if (setIsEdit) setIsEdit(true);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={({ target }) => {
              setSearchValue(target.value);
            }}
            placeholder={"標籤Tags"}
          />
        )}
      />
    </div>
  );
};

export default Tags;
