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
    
    const respBody = await resp.text();
    if (resp.status != 200) {
        return makeResponse(`Error ${respBody}`);
    }
    return new Response(
        await respBody,
		{
			headers: { 'content-type': 'application/json' },
		}
    )
}

// makeResponse builds a JSON response with the supplied status code.
function makeResponse(text, code) {
	return new Response(
		JSON.stringify({
			message: text,
		}),
		{
			status: code,
			headers: { 'content-type': 'application/json' },
		}
	);
}