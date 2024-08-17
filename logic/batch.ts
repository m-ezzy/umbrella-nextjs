import { prisma } from "@/lib/db"
import { batch } from "@prisma/client"

async function createBatch(data: batch) {
  const result = await prisma.batch.create({ data: data })
  return result
}
async function updateBatch(data: batch) {
  const result = await prisma.batch.update({
    data: data,
    where: {
      id: data.id
    },
  })
  return result
}
async function deleteBatch(batch_id: number) {
  const result = await prisma.batch.delete({
    where: {
      id: batch_id
    }
  })
  .catch((error) => {
    console.error(error)
    return { error }
  })
  return result
}

export { createBatch, updateBatch, deleteBatch }
