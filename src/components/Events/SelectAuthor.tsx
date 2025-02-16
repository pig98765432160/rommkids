import { FormControl, MenuItem, Select } from "@mui/material";
import { Dispatch, FC, useState } from "react";
import { ActionType } from "@/components/Events/Post";

interface Props {
  dispatch: Dispatch<any>;
  author: string;
}

const Author = [
  { uid: 1, name: "嗄歐" },
  { uid: 2, name: "麥麥" },
];

const SelectAuthor: FC<Props> = (props) => {
  const { dispatch, author } = props;
  const [selectedAuthorID, setSelectedAuthorID] = useState<number>(0);

  const handleSelectAuthor = (event: any) => {
    setSelectedAuthorID(event.target.value);

    const selectAuthor = Author?.find(
      (item: any) => item.uid === Number(event.target.value)
    )?.name;

    dispatch({
      type: ActionType.SET_AUTHOR,
      payload: {
        author: selectAuthor,
      },
    });
  };

  return (
    <div className="w-full flex items-center gap-2 lg:my-3">
      <FormControl sx={{ flex: 1 }}>
        <Select
          required
          value={selectedAuthorID}
          onChange={handleSelectAuthor}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            fontSize: "14px",
            "& .MuiSelect-select": {
              padding: "0.875rem",
              "@media (min-width: 640px)": {
                padding: "0.7rem",
              },
            },
          }}
        >
          <MenuItem disabled value={0} sx={{ fontSize: "15px" }}>
            請選擇作者
          </MenuItem>
          {Author.map((item: any) => (
            <MenuItem value={item.uid} key={item.uid} sx={{ fontSize: "15px" }}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectAuthor;
