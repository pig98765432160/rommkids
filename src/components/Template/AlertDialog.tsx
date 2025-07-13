import { Dialog, DialogContent } from "@mui/material";
import { FC, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { CloseIcon, InfoIcon, NoticeIcon } from "@/components/Icons/icons";
import { EStatus } from "@/shared/types/Status";
import { useRouter } from "next/router";

const AlertDialog: FC = () => {
  const { status, open, text, link, closeBtn, routerLink } = useSelector(
    (state: any) => state.alert
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch({
      type: "alert/update",
      payload: {
        status,
        open: false,
        text,
      },
    });
    if (link) {
      window.location = link;
    } else if (routerLink) {
      router.push(routerLink[0], routerLink[1], { shallow: true });
    }
  }, [dispatch, status, text, link, routerLink, router]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (open && !closeBtn && status !== EStatus.WARNING) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        handleClose();
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [open, closeBtn, status, handleClose]);

  return (
    <Dialog
      sx={{
        height: "100vh",
        paddingBottom: "10%",
        borderRadius: "6px",
        color: "#464646",
        textAlign: "center",
        userSelect: "none",
        "& ::-webkit-scrollbar": { display: "none" },
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogContent
        sx={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {closeBtn && (
          <button className="w-full flex justify-end" onClick={handleClose}>
            <CloseIcon width={16} height={16} className={""} />
          </button>
        )}

        <div className="mb-5 flex justify-center items-center">
          {status === EStatus.ERROR ? (
            <div className="w-16 h-16 border-4 border-border rounded-full flex items-center justify-center">
              <CloseIcon width={35} height={35} className="icon-hot" />
            </div>
          ) : status === EStatus.SUCCESS ? (
            <Image
              src="/icon/check_success.svg"
              alt="check"
              width={70}
              height={70}
              className="w-[70px] h-[70px]"
            />
          ) : status === EStatus.WARNING ? (
            <NoticeIcon width={70} height={70} className="icon-comment-hot" />
          ) : status === EStatus.INFO ? (
            <InfoIcon width={70} height={70} className="icon-primary" />
          ) : null}
        </div>
        <p>{text}</p>
        {status === EStatus.WARNING && (
          <button
            aria-label="關閉"
            onClick={handleClose}
            className="bg-primary text-white text-sm rounded px-5 py-1 mt-3"
          >
            我知道了
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
