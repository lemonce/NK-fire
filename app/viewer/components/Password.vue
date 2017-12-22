<template>
<div class="container-fluid" id="modify-password">
	<div class="row">
		<div class="col-sm-4">
			<div class="form-group">
				<label for="old-password">输入旧密码</label>
				<input type="text" id="old-password" class="form-control">

			</div>
			<div class="form-group">
				<label for="new-password">输入新密码</label>
				<input type="text" id="new-password" class="form-control">

			</div>
			<div class="form-group">
				<label for="confirm-password">确认新密码</label>
				<input type="text" id="confirm-password" class="form-control">

			</div>
			<router-link class="btn btn-info" to="/">保存</router-link>
		</div>
	</div>

</div>
</template>

<style lang="less">
#modify-password {
	background: #ffffff;
	height: 1017px;
}
</style>
