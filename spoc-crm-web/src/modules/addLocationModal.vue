<style lang="less">
	.set-location-modal {
		.ivu-select-not-found {
			display: none;
		}
	}
</style>

<template>
	<Modal
		width=730
		:title="title"
		@on-ok="okLocation"
		ref="refModalLocation"
		v-model="modalLocation"
		class="set-location-modal"
		@on-cancel="cancelLocation">
		<Form :label-width="80">
			<FormItem label="国家">
				<Select
					remote
					filterable
					:loading="countryLoading"
					v-model="country"
					:label="countryNames"
					style="width:200px">
					<Option v-for="item in countryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
			</FormItem>
			<FormItem label="省份">
				<Select	v-model="province" style="width:200px">
					<Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
			</FormItem> 
			<FormItem label="城市" v-if="(province != 247) && (province != 248) && (province != 255) && (province != 268) && (province != 279) && (province != 280)">
				<Select v-model="city" style="width:200px">
					<Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
			</FormItem>
			<FormItem label="所属分公司">
				<Select v-model="office" style="width:200px">
					<Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.companyName }}</Option>
				</Select>
			</FormItem>
		</Form>
	</Modal>
</template>

<script>
import { waitUntil, } from '@public/libs/util';
import valid, { errors, crmLocation, sys, sysConfig, } from '../libs/request';
export default {
	name: 'AddLocationModal',
	props: {
		title: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			default: null,
		},
		companyList: {
			type: Array,
			required: true,
		},
		countryId: {
			default: null,
		},
		countryName: {
			default: null,
		},
		provinceId: {
			default: null,
		},
		cityId: {
			default: null,
		},
		officeId: {
			default: null,
		},
		timeStap: {
			default: null,
		},
	},
	data() {
		return {
			modalLocation: false,

			country: null,
			countryLoading: false,
			countryList: [],
			countryNames: '',

			province: null,
			provinceLoading: false,
			provinceList: [],

			city: null,
			cityLoading: false,
			cityList: [],

			office: null,
			officeLoading: false,
		};
	},
	watch: {
		country(newVal) {
			if (newVal) {
				this.province =  this.city = null;
				this.provinceList = this.cityList = [];
				this.getOthers(newVal, 'province');
			}
		},
		province(newVal) {
			if (newVal) {
				this.getOthers(newVal, 'city');
			}
		},
		timeStap(newVal) {
			this.country = this.countryId;
			this.countryNames = this.countryName;
			this.office = this.officeId;
		},
	},
	methods: {
		/*
		* 点击确定
		*/
		okLocation() {
			this.modalLocation = true;
			this.$refs.refModalLocation.visible = true;

			switch (this.province) {
				case '247': this.city = '247'; break;
				case '248': this.city = '248'; break;
				case '255': this.city = '255'; break;
				case '268': this.city = '268'; break;
				case '279': this.city = '279'; break;
				case '280': this.city = '280'; break;
			};

			if (!this.country || !this.province || !this.office) {
				this.$Message.warning('请完善归属地信息');
				this.$refs.refModalLocation.visible = true;
				this.modalLocation = true;
				return;
			}

			const data = {
				id: this.id,
				country: this.country,
				province: this.province,
				city: this.city,
				office: this.office,
			};

			data.city = data.city === '所有' ? '0' : data.city;
			this.$emit('onclickSaveLocation', data);
		},
		show() {
			this.modalLocation = true;
		},
		cancelLocation() {
			this.country = this.province =  this.city = this.office = this.countryNames = null;
			this.provinceList = this.cityList = [];
			this.modalLocation = false;
			this.$emit('cancelLocation');
		},
		/*
		* 获取国家
		*/
		getLocation(data) {
			sysConfig.findByName(data).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.countryLoading = false;
					this.countryList = res.data.data;
					this.country = this.countryId;
				}
			}).catch(errors.call(this));
		},
		/*
		* 联动
		*/
		getOthers(id, location) {
			switch (location) {
				case 'province': id = id ? id : this.country; break;
				case 'city': id = id ? id : this.province; break;
			};
			sysConfig.listLocation({ id, }).then(valid.call(this)).then(res => {
				if (res.ok) {
					switch (location) {
						case 'province':
							this.provinceList = res.data.data;
							this.provinceList.forEach(item => {
								if (item.id == this.provinceId) {
									this.province = this.provinceId;
								}
							});
							this.province = this.province ? this.province : null;
						break;
						case 'city':
							this.cityList = res.data.data;
							this.cityList.unshift({ name: '所有', id: '所有', });
							this.cityList.forEach(item => {
								if (item.id == this.cityId) {
									this.city = this.cityId;
								}
							});
							this.city = this.city ? this.city : null;
						break;
					}
				}
			}).catch(errors.call(this));
		},
	},
	created() {
		this.getLocation({
					level: '2',
					name: null,
		});
	},
};
</script>