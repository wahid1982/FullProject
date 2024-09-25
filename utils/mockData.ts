// Define mock data
//const baseUrl = "https://test.runbservices.com/api/auth/";
//const login = "login"; // Example endpoint

// Construct the full API URL
export const baseUrl = "https://portal.bizcloud.qa";

export const mockUser = {
  id: "mockUserId123",
  email: "test@example.com",
  username: "Wahid Benhmed",
  avatar:
    "https://gravatar.com/avatar/24b8c3ac25ba7fd9338f3f8157777a7d?s=400&d=robohash&r=x",
};

export const mockPosts = [
  {
    id: "mockPostId123",
    title: "Mock Post",
    thumbnail: "https://example.com/files/image/mockThumbnailId/preview",
    video: "https://example.com/files/video/mockVideoId/preview",
    prompt: "This is a mock post",
    creator: "mockUserId123",
  },
];
