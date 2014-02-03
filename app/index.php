<?php

class App {
	private $path_data = "data/data.json";
	private $path_template = "data/template.json";
	private $jsonObject;
	private $root;

	public function __construct(){
		$this->root = __DIR__ .  '/../';
		if(file_exists($this->root . $this->path_data)){
			$this->loadContents();
		} elseif (file_exists($this->root . $this->path_template)){
			$this->initialize_data();
		} else {
			die("Unable to locate data source.");
		}

	}

	public function __toString(){
		return json_encode($this->jsonObject);
	}

	public function loadContents(){
		$this->jsonObject = json_decode(file_get_contents($this->root . $this->path_data));
		return $this;
	}

	private function initialize_data(){
		copy($this->root . $this->path_template, $this->root . $this->path_data);
		return $this;
	}

	public function store($str){
		$contents = json_encode($str);
		$handle = fopen($this->root . $this->path_data, 'w');
		fwrite($handle, $contents);
		fclose($handle);
		return true;
	}

	public function reset(){
		$this->initialize_data()->loadContents();
		return true;
	}
}
