import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";

// test
export const getTest = async () => {
  return await supabase.from("test").select("*");
};

// board
export const getBoard = async () => {
  return await supabase.from("boards").select(`
        *,
        users (
          name,
          email,
          created_at
        )
      `);
};

interface User {
  name: string;
  email: string;
  password: string;
}

// board details
export const getBoardDetails = async (params: number) => {
  console.log("id: ", params);

  return await supabase
    .from("boards")
    .select(
      `
    *,
    users (
      name,
      email,
      created_at
    ),
    images (
      url
    )
  `
    )
    .eq("id", params)
};

// signup
export const postSignup = async (user: User) => {
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    ])
    .select();

  if (error) {
    console.error("회원가입 에러:", error);
    throw error;
  }

  return data;
};

// 게시글 작성
// 1. boards 테이블에 게시글 등록
export const postBoardCreate = async (
  board: object,
  images: string[],
  imagesFileName: string[],
  session: Session | null
) => {
  if (!session) {
    throw new Error("로그인이 필요합니다.");
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("email", session.user.email)
    .single();

  if (userError || !userData) {
    console.error("유저 정보를 불러오지 못했습니다", userError);
    return;
  }

  const userId = userData.id;
  console.log("userId: ", userId);
  console.log("board: ", board);

  // 1. boards 테이블에 게시글 등록
  const { data: boardData, error: boardError } = await supabase
    .from("boards")
    .insert([
      {
        title: board.title,
        content: board.content,
        user_id: userId,
        like: 0,
      },
    ])
    .select("id") // id 값을 반환 받기 위함
    .single();

  if (boardError) {
    console.error("게시글 작성 오류:", boardError);
    throw boardError;
  }

  const boardId = boardData.id;
  console.log("boardId: ", boardId);

  // 2. 이미지가 있는 경우 images 테이블에 삽입
  if (images.length > 0) {
    const imageInserts = images.map((uri) => ({
      url: uri,
      // url: `${Date.now()}-${uri}`,
      board_id: boardId,
    }));

    const { error: imageError } = await supabase
      .from("images")
      .insert(imageInserts);

    if (imageError) {
      console.error("이미지 등록 오류:", imageError);
      throw imageError;
    }
  }

  return boardData;
};
