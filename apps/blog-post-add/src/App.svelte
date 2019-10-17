<script>

  import { form } from 'svelte-forms';

	export let app;
  export let userId;
  
	let Title = "";
  let Text = "";
  let submitted = false;

  const postForm = form(() => ({
    Title: { value: Title, validators: ["required", "max:50"]},
    Text: { value: Text, validators: ["required", "max:4000"]}
  }));

	function onSubmit(event) {

    submitted = true;

    if(!postDetailsValid())
      return;

		fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify({
				title: Title,
				body: Text,
				userId: userId
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then(response => response.json())
		.then(json => {
			console.log(json);
			window.location.href = `apps/blog-post-view?id=${json.id}`;
    });
    
    function postDetailsValid() {
      return $postForm.Title.valid && 
        $postForm.Text.valid;
    }
}
	
</script>

<style>
.error {
    color: red;
  }
</style>
	
<div class="container-fluid">

  <div class="row">
    <div class="col-md-6">
      <section id="post">
        <h2>Write Post</h2>
        <hr />
        <form on:submit|preventDefault={onSubmit}>

          <div class="form-group">
            <label class="col-md-2 control-label" for="title">Title</label>
            <div class="col-md-10">
              <input name="title" bind:value={Title} type="text" placeholder="Enter title" class="form-control">
              {#if $postForm.Title.errors.includes('required') }
                <div hidden={!submitted} class="error">Title is required</div>
              {/if}
              
              {#if $postForm.Title.errors.includes('min') }
                <p hidden={!submitted} class="error">Title should be maximum 50 characters</p>
              {/if}
            </div> 
          </div>

          <div class="form-group">
            <label class="col-md-2 control-label" for="title">Text</label>
            <div class="col-md-10">
              <textarea name="text" bind:value={Text} rows="5" cols="60" placeholder="Enter post text here..." class="form-control"></textarea>
              {#if $postForm.Text.errors.includes('required') }
                <div hidden={!submitted} class="error">Text is required</div>
              {/if}
              
              {#if $postForm.Text.errors.includes('min') }
                <p hidden={!submitted} class="error">Title should be maximum 50 characters</p>
              {/if}
            </div> 
          </div>

          <div class="form-group">
              <div class="col-md-offset-2 col-md-10">
                  <input type="submit" value="Create" class="btn btn-primary" />
              </div>
          </div>

        </form>
      </section>
    </div>

  </div>

</div>


