// lib/tgc-publish.ts

export async function publishDeck(params: {
  authToken: string;      // your app's JWT
  tgcToken: string;
  gameId: string;
  folderId: string;
  deckId: string;
  cartId: string;
  skuId: string;
  cardFiles: File[];      // exactly 54 File objects
}) {
  const form = new FormData();
  form.append('tgc_token', params.tgcToken);
  form.append('game_id',   params.gameId);
  form.append('folder_id', params.folderId);
  form.append('deck_id',   params.deckId);
  form.append('cart_id',   params.cartId);
  form.append('sku_id',    params.skuId);

  params.cardFiles.forEach((file) => {
    form.append('cards[]', file);
  });

  const res = await fetch('/api/tgc/publish', {
    method: 'POST',
    headers: { Authorization: `Bearer ${params.authToken}` },
    body: form,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ job_id: string; status_url: string }>;
}

// Poll job status until done
export async function pollJobStatus(
  jobId: string,
  authToken: string,
  onProgress?: (data: JobStatus) => void,
): Promise<JobStatus> {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/tgc/publish/${jobId}/status`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const data: JobStatus = await res.json();
        onProgress?.(data);

        if (data.status === 'completed' || data.status === 'failed') {
          clearInterval(interval);
          data.status === 'completed' ? resolve(data) : reject(data);
        }
      } catch (e) {
        clearInterval(interval);
        reject(e);
      }
    }, 2000);
  });
}

interface JobStatus {
  job_id: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  message: string;
  uploaded?: number;
  total?: number;
  updated_at: string;
}