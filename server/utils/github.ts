export const updateJSON = async (newData) => {
  const config = useRuntimeConfig()
  const url = `https://api.github.com/repos/${config.githubOwner}/${config.githubRepo}/contents/posts.json`

  // 1️⃣ Lấy SHA của file hiện tại
  const response = await fetch(url, {
    headers: { Authorization: `token ${config.githubToken}` }
  })

  if (!response.ok) {
    throw new Error('Lỗi lấy file JSON')
  }

  const fileData = await response.json()
  const sha = fileData.sha // Cần SHA để update

  // 2️⃣ Mã hóa JSON thành Base64 (UTF-8 safe)
  const jsonString = JSON.stringify(newData, null, 2)
  // Use Buffer for Node.js environment to handle UTF-8 characters properly
  const updatedContent = Buffer.from(jsonString).toString('base64')

  // 3️⃣ Cập nhật file JSON trên GitHub
  const updateResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${config.githubToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Cập nhật JSON',
      content: updatedContent,
      sha: sha
    })
  })

  if (!updateResponse.ok) {
    throw new Error('Lỗi cập nhật JSON')
  }
}
