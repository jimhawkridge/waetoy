export async function onRequestPost({request, env}) {
    const account = env.ACCOUNT_ID;
    const bearer = env.BEARER;
    const API = `https://api.cloudflare.com/client/v4/accounts/${account}/analytics_engine/sql`;
    const query = await request.text();
    const resp = await fetch(API, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${bearer}`,
        },
        body: query
    })
    
    let respBody = await resp.text();
    if (resp.status != 200) {
        respBody = JSON.stringify({error: respBody});
    }
    return new Response(
        respBody,
		{
			headers: { 'content-type': 'application/json' },
		}
    )
}
