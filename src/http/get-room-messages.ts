interface GetRoomMessagesRequest {
  roomId: string;
}

export interface GetRoomMessagesResponse {
  messages: {
    id: string;
    text: string;
    amountOfReactions: number;
    answered: boolean;
  }[];
}

export async function getRoomMessages({
  roomId,
}: GetRoomMessagesRequest): Promise<GetRoomMessagesResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`
  );

  const data = await response.json();

  const listMessages = data.map((item: any) => ({
    id: item.ID,
    text: item.Message,
    amountOfReactions: item.ReactionCount,
    answered: item.Answered,
  }));

  console.log("mensagens", data);

  return {
    messages: listMessages.map((item: any) => {
      return {
        id: item.id,
        text: item.text,
        amountOfReactions: item.amountOfReactions,
        answered: item.answered,
      };
    }),
  };
}
