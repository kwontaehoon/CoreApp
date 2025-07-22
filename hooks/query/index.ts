import { useMutation, useQuery } from "@tanstack/react-query";
import { getBoard, getBoardDetails, getTest, getUserName, postBoardCreate, postComment, postSignup } from "@/service";
import { uploadMultipleImages } from "@/service/storage";


const TEST_QUERY_KEY = {
    test: ["test"],
}

const COREAPP_QUERY_KEY = {
    board: ["board"],
    boardDetails: ["board_Deatils"],
    userName: ["userName"]
}

// test
export const useTestQuery = () => {
    const queryOptions = {
        queryKey: TEST_QUERY_KEY.test,
        queryFn: async () => {
            const { data } = await getTest();
            console.log("getTest: ", data)
            return data;
        },
    };

    return useQuery(queryOptions);
};

// userName
export const useUserNameQuery = (session) => {
    const queryOptions = {
        queryKey: COREAPP_QUERY_KEY.userName,
        queryFn: async () => {
            const { data } = await getUserName(session);
            return data;
        },
    };

    return useQuery(queryOptions);
};

// board
export const useBoardQuery = () => {
    const queryOptions = {
        queryKey: COREAPP_QUERY_KEY.board,
        queryFn: async () => {
            const { data } = await getBoard();
            return data;
        },
    };

    return useQuery(queryOptions);
};

// boardDetails
export const useBoardDetailsQuery = (params:number) => {
    const queryOptions = {
        queryKey: [COREAPP_QUERY_KEY.boardDetails, params],
        queryFn: async () => {
            const { data } = await getBoardDetails(params);
            return data;
        },
    };

    return useQuery(queryOptions);
};

// signup
export const useSignupMutation = (params:object) => {
    const mutationOptions = {
        mutationFn: async () => {
            const results = await postSignup(params);
            return results;
        },
    };
    return useMutation(mutationOptions);
};

// boardCreate
export const useBoardCreateMutation = (board, images, imagesFileName, session) => {
    const mutationOptions = {
        mutationFn: async () => {
            const results = await postBoardCreate(board, images, imagesFileName, session);
            return results;
        },
    };
    return useMutation(mutationOptions);
};

// uploadImages to bucket
export const useUploadImagesToBucketMutation = (files: FileList | File[], fileName, session) => {
    const mutationOptions = {
        mutationFn: async () => {
            const results = await uploadMultipleImages(files, fileName, session);
            return results;
        },
    };
    return useMutation(mutationOptions);
};

//commentCreate
export const useCommentCreateMutation = (board_id, content, session) => {
    const mutationOptions = {
        mutationFn: async () => {
            const results = await postComment(board_id, content, session);
            return results;
        },
    };
    return useMutation(mutationOptions);
};