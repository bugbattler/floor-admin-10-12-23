import { List } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductBulkUpload from "./ProductBulkUpload";

const Products = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(10, id);
  const [AllSuperCat, setAllSuperCat] = useState([]);
  const [AllCat, setAllCat] = useState([]);
  const [AllSubCat, setAllSubCat] = useState([]);
  const [AllCatData, setAllCatData] = useState([]);
  const [AllBrands, setAllBrands] = useState([]);
  const [ShowBulk, setSHowBulk] = useState(true);
  const [data, setData] = useState({
    name: "",
    short_desc: "",
    long_desc: "",
    additional_info: "",
    ship_policy: "",
    price: "",
    sale_price: "",
    sku: "",
    Collection_Name: "",
    installation_method: "",
    thickness: "",
    wear_layer_thickness: "",
    width: "",
    length: "",
    review: "",
    ratings: "",
    stock: "",
    BestSeller: "",
    newProduct: "",
    IsmostViewed: "",
    isDiscount: "",
    featured: "",
    sold: "",
    SuperCatID: "",
    SuperCatName: "",
    CatID: "",
    CatName: "",
    SubCatID: "",
    SubCatName: "",
    BrandID: "",
    BrandName: "",
    BoxPrice: "",
    BoxCoverage: "",
    isAddon: "",
    productPictures: "",
    color: "",
    createdBy: "",
    updatedAt: "",
    Manufacture: "",
    Application: "",
    Product_Type: "",
    Commercial_Warranty: "",
    Certifation: "",
    Core_Type_Detail: "",
    Years: "",
    Edge_Type: "",
    Coverage_sqft: "",
    length_cm: "",
    Format_in: "",
    Manufacturer_color: "",
    length_in_fraction: "",
    Shape: "",
    Recidential_warranty: "",
    Underpad_attached: "",
  });
  const [productPictures, setproductPictures] = useState([]);
  const [formValue, setFormValue] = useState(data);
  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInput = (e) => {
    const newObj = { ...formValue, [e.target.name]: e.target.value };
    setFormValue(newObj);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(85, data);
    setErrors(Validation(data));
    const err = Validation(data);
    setErrors(true);
    console.log(89, err);
    if (Object.keys(err).length == 0) {
      {
        axios
          .post(
            "https://backend-floor-10-12-23.vercel.app/api/product/create",
            data
          )
          .then((response) => {
            const products = response.data;
            console.log(77, products.product._id);
            uploadProductPic(products.product._id);
            toast.success("Form Submitted !");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      setErrors(err);
      console.log(err);
      toast.warn("Please fill all feilds.");
    }
  };

  const uploadProductPic = (id) => {
    const formData = new FormData();
    productPictures.forEach((file, index) => {
      formData.append(`productPictures`, file);
    });
    axios
      .put(
        `https://backend-floor-10-12-23.vercel.app/api/product/files/${id}`,
        formData
      )
      .then((res) => {
        console.log("Files", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("https://backend-floor-10-12-23.vercel.app/api/category/get")
      .then((res) => {
        const response = res.data.categories;
        setAllCatData(response);
        const Allsupcat = response.filter((item) => item.Type == "Super_Cat");
        setAllSuperCat(Allsupcat);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://backend-floor-10-12-23.vercel.app/api/brand/getAll")
      .then((res) => {
        const response = res.data;
        console.log(response);
        setAllBrands(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Validation = (values) => {
    const errors = {};
    const regex =
      "^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$";
    if (!values.name) {
      errors.name = "Please enter product name. ";
    }

    if (!values.sku) {
      errors.sku = " Feild cannot be blank.";
    }

    if (!values.short_desc) {
      errors.short_desc = "Description is required.";
    }

    if (!values.price) {
      errors.price = "Please enter price. ";
    }

    if (!values.BoxPrice) {
      errors.BoxPrice = "Please enter box price. ";
    }

    if (!values.BoxCoverage) {
      errors.BoxCoverage = "Feild cannot be blank. ";
    }

    if (!values.sale_price) {
      errors.sale_price = "Feild cannot be blank. ";
    }

    if (!values.stock) {
      errors.stock = "Feild cannot be blank. ";
    }

    if (!values.Collection_Name) {
      errors.Collection_Name = "Feild cannot be blank. ";
    }

    if (!values.installation_method) {
      errors.installation_method = "Feild cannot be blank. ";
    }

    if (!values.thickness) {
      errors.thickness = "Feild cannot be blank. ";
    }

    if (!values.wear_layer_thickness) {
      errors.wear_layer_thickness = "Feild cannot be blank. ";
    }

    if (!values.width) {
      errors.width = "Feild cannot be blank. ";
    }

    if (!values.length) {
      errors.length = "Feild cannot be blank. ";
    }

    // if (!values.BestSeller) {
    //   errors.BestSeller = "Feild cannot be blank. ";
    // }

    // if (!values.IsmostViewed) {
    //   errors.IsmostViewed = "Feild cannot be blank. ";
    // }

    // if (!values.isDiscount) {
    //   errors.isDiscount = "Feild cannot be blank. ";
    // }

    // if (!values.SuperCatID) {
    //   errors.SuperCatID = "Feild cannot be blank. ";
    // }

    // if (!values.CatName) {
    //   errors.CatName = "Feild cannot be blank. ";
    // }

    // if (!values.SubCatID) {
    //   errors.SubCatID = "Feild cannot be blank. ";
    // }

    // if (!values.SuperCatName) {
    //   errors.SuperCatName = "Please Select main category. ";
    // }

    // if (!values.SubCatName) {
    //   errors.SubCatName = "Feild cannot be blank. ";
    // }

    // if (!values.BrandName) {
    //   errors.BrandName = "Please Select brand . ";
    // }

    // if (!values.newProduct) {
    //   errors.newProduct = "Feild cannot be blank. ";
    // }

    // if (!values.CatName) {
    //   errors.CatName = " Please Select category.  ";
    // }

    // if (!values.SuperCatName) {
    //   errors.SuperCatName = "Please Select main category. ";
    // }

    // if (!values.SubCatName) {
    //   errors.SubCatName = "Please Select sub category.  ";
    // }

    // if (!values.color) {
    //   errors.color = " Please select colour  ";
    // }

    return errors;
  };

  const getCat = (id) => {
    const getCat = AllCatData.filter((item) => item.parentId == id);
    setAllCat(getCat);
  };

  const getSubCat = (id) => {
    console.log(291, id);
    const getSubCat = AllCatData.filter((item) => item.parentId == id);
    console.log(getSubCat);
    setAllSubCat(getSubCat);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log(300, files);
    setproductPictures([...files]);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagePreviewArray = [];
    for (let i = 0; i < files.length; i++) {
      const productPictures = files[i];
      const objectURL = URL.createObjectURL(productPictures);
      imagePreviewArray.push(objectURL);
    }
    setImagePreviews(imagePreviewArray);
  };

  useEffect(() => {
    axios
      .get(`https://backend-floor-10-12-23.vercel.app/api/product/${id}`)
      .then((res) => {
        const response = res.data.product;
        console.log(278, response);
        setData({
          name: response.name,
          slug: response.slug,
          short_desc: response.short_desc,
          long_desc: response.long_desc,
          additional_info: response.additional_info,
          ship_policy: response.ship_policy,
          price: response.price,
          sale_price: response.sale_price,
          sku: response.sku,
          Collection_Name: response.Collection_Name,
          installation_method: response.installation_method,
          thickness: response.thickness,
          wear_layer_thickness: response.wear_layer_thickness,
          width: response.width,
          length: response.length,
          review: response.review,
          ratings: response.ratings,
          stock: response.stock,
          BestSeller: response.BestSeller ? "true" : "false",
          newProduct: response.newProduct ? "true" : "false",
          IsmostViewed: response.IsmostViewed ? "true" : "false",
          isDiscount: response.isDiscount ? "true" : "false",
          featured: response.featured,
          sold: response.sold,
          SuperCatID: response.SuperCatID,
          SuperCatName: response.SuperCatName,
          CatID: response.CatID,
          CatName: response.CatName,
          SubCatID: response.SubCatID,
          SubCatName: response.SubCatName,
          BrandID: response.BrandID,
          BrandName: response.BrandName,
          isAddon: response.isAddon,
          BoxPrice: response.BoxPrice,
          BoxCoverage: response.BoxCoverage,
          color: response.color,
          Manufacture: response.Manufacture,
          Application: response.Application,
          Product_Type: response.Product_Type,
          Commercial_Warranty: response.Commercial_Warranty,
          Certifation: response.Certifation,
          Core_Type_Detail: response.Core_Type_Detail,
          Years: response.Years,
          Edge_Type: response.Edge_Type,
          Coverage_sqft: response.Coverage_sqft,
          length_cm: response.length_cm,
          Format_in: response.Format_in,
          Manufacturer_color: response.Manufacturer_color,
          length_in_fraction: response.length_in_fraction,
          Shape: response.Shape,
          Recidential_warranty: response.Recidential_warranty,
          Underpad_attached: response.Underpad_attached,
        });
        console.log(317, response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const updateFormData = (e) => {
    axios
      .put(
        `https://backend-floor-10-12-23.vercel.app/api/product/update/${id}`,
        data
      )
      .then((res) => {
        const response = res.data;
        uploadProductPic(response._id);

        console.log(327, response._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h2 className="mb-5">Product Form</h2>
      <div className="mb-4">
        <select
          name=""
          id=""
          style={{
            width: "300px",
            backgroundColor: "#e7e7e7",
            color: "black",
          }}
          onChange={(e) => {
            console.log(394, e.target.value);
            if (e.target.value === `false`) {
              setSHowBulk(false);
            } else {
              setSHowBulk(true);
            }
          }}
          className="btn btn-secondary border-0"
        >
          <option style={{ background: "white", color: "black" }} value="">
            Select Category
          </option>

          <option
            style={{
              background: "white",
              color: "black",
              textAlign: "left",
            }}
            class="dropdown-item"
            href="#"
            value={true}
            // onChange={(e) => getCat(item._i
          >
            Show Bulk Product Upload Form
          </option>
          <option
            style={{
              background: "white",
              color: "black",
              textAlign: "left",
            }}
            class="dropdown-item"
            href="#"
            value={false}
            // onChange={(e) => getCat(item._i
          >
            Show Single Product Upload Form
          </option>
        </select>
      </div>
      {ShowBulk ? (
        <>
          <ProductBulkUpload />
        </>
      ) : (
        <>
          <form
            class="row g-3 pt-3 shadow p-3 mb-5"
            style={{ padding: 20, backgroundColor: "#f7f6ed" }}
            onSubmit={Validation}
          >
            <div class="col-md-4">
              <label for="inputEmail4" class="form-label txt-input">
                Product Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                value={data.name}
                id="inputEmail4"
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.name && data.name.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.name}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputCity" class="form-label txt-input">
                Installation Method <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                value={data.installation_method}
                id="inputCity"
                onChange={(e) => {
                  setData({ ...data, installation_method: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.name && data.installation_method.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.installation_method}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputCity" class="form-label txt-input">
                Price <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                class="form-control"
                value={data.price}
                id="inputCity"
                onChange={(e) => {
                  setData({ ...data, price: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.name && data.price.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.price}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputCity" class="form-label txt-input">
                Sale Price <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                class="form-control"
                id="inputCity"
                value={data.sale_price}
                onChange={(e) => {
                  setData({ ...data, sale_price: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.name && data.sale_price.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.sale_price}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputZip" class="form-label txt-input">
                Stock <span className="text-danger"></span>
              </label>
              <input
                type="number"
                class="form-control"
                value={data.stock}
                id="inputZip"
                onChange={(e) => {
                  setData({ ...data, stock: e.target.value });
                  handleInput(e);
                }}
              />
            </div>

            <div class="col-md-4">
              <label for="inputZip" class="form-label txt-input">
                Box Price <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                class="form-control"
                id="inputZip"
                value={data.BoxPrice}
                onChange={(e) => {
                  setData({ ...data, BoxPrice: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.name && data.BoxPrice.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.BoxPrice}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputZip" class="form-label txt-input">
                Box Coverage <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                value={data.BoxCoverage}
                class="form-control"
                id="inputZip"
                onChange={(e) => {
                  setData({ ...data, BoxCoverage: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.name && data.BoxCoverage.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.BoxCoverage}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputZip" class="form-label txt-input">
                Rating <span className="text-danger"></span>
              </label>
              <input
                type="number"
                class="form-control"
                id="inputZip"
                value={data.ratings}
                onChange={(e) => {
                  setData({ ...data, ratings: e.target.value });
                  handleInput(e);
                }}
              />
            </div>

            <div class="col-md-4">
              <label for="inputZip" class="form-label txt-input">
                Review <span className="text-danger"></span>
              </label>
              <input
                type="number"
                class="form-control"
                id="inputZip"
                value={data.review}
                onChange={(e) => {
                  setData({ ...data, review: e.target.value });
                  handleInput(e);
                }}
              />
            </div>

            <div class="col-md-4">
              <label for="inputZip" class="form-label txt-input">
                Collection Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                value={data.Collection_Name}
                id="inputZip"
                onChange={(e) => {
                  setData({ ...data, Collection_Name: e.target.value });
                  handleInput(e);
                }}
              />

              {errors.name && data.Collection_Name.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.Collection_Name}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4 ">
              <label
                for="floatingSelect "
                class="col-form-label  pt-0 txt-input"
              >
                New Product <span className="text-danger">*</span>
              </label>
              <select
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                value={data.newProduct}
                onChange={(e) => {
                  let selectedValue = e.target.value;
                  if (selectedValue === "true") {
                    setData({ ...data, newProduct: true });
                    console.log(442, selectedValue);
                    console.log(442, data);
                  } else if (selectedValue === "false") {
                    setData({ ...data, newProduct: false });
                    console.log(442, selectedValue);
                  } else {
                    setData({ ...data, newProduct: null });
                  }
                }}
              >
                <option value=""> --Select--</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            <div class="col-md-4">
              <label for="inputCity" class="form-label txt-input">
                Thickness <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                value={data.thickness}
                id="inputCity"
                onChange={(e) => {
                  setData({ ...data, thickness: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.name && data.thickness.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.thickness}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4 ">
              <label
                for="floatingSelect1"
                class="col-form-label  pt-0 txt-input"
              >
                Discount <span className="text-danger">*</span>
              </label>
              <select
                class="form-select"
                id="floatingSelect1"
                aria-label="Floating label select example"
                value={data.isDiscount}
                onChange={(e) => {
                  let selectedValue = e.target.value;

                  if (selectedValue === "true") {
                    setData({ ...data, isDiscount: true });
                  } else if (selectedValue === "false") {
                    setData({ ...data, isDiscount: false });
                  } else {
                    setData({ ...data, isDiscount: null });
                  }
                }}
              >
                <option value=""> --Select--</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            <div class="col-md-4">
              <label for="inputCity" class="form-label txt-input">
                Wear Layer Thickness <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                class="form-control"
                value={data.wear_layer_thickness}
                id="inputCity"
                onChange={(e) => {
                  setData({ ...data, wear_layer_thickness: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.name && data.wear_layer_thickness.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.wear_layer_thickness}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputCity" class="form-label txt-input">
                Width <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                class="form-control"
                value={data.width}
                id="inputCity"
                onChange={(e) => {
                  setData({ ...data, width: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.name && data.width.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.width}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label
                for="floatingSelect1"
                class="col-form-label  pt-0 txt-input"
              >
                Best Seller <span className="text-danger">*</span>
              </label>
              <select
                class="form-select"
                id="floatingSelect1"
                aria-label="Floating label select example"
                value={data.BestSeller}
                onChange={(e) => {
                  let selectedValue = e.target.value; // Get the selected value

                  if (selectedValue === "true") {
                    setData({ ...data, BestSeller: true });
                  } else if (selectedValue === "false") {
                    setData({ ...data, BestSeller: false });
                  } else {
                    setData({ ...data, BestSeller: null }); // Handle other cases if needed
                  }
                }}
              >
                <option value=""> --Select--</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
              {/* {errors.name && data.BestSeller ===null ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.BestSeller}
            </p>
          ) : (
            ""
          )} */}
            </div>

            <div class="col-md-4">
              <label for="inputCity" class="form-label txt-input">
                Length <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                class="form-control"
                value={data.length}
                id="inputCity"
                onChange={(e) => {
                  setData({ ...data, length: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.name && data.length.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.length}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputZip" class="form-label txt-input">
                SKU <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                class="form-control"
                value={data.sku}
                id="inputZip"
                onChange={(e) => {
                  setData({ ...data, sku: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.name && data.sku.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.sku}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-3">
              <label for="inputState" class="form-label txt-input">
                Main Category <span className="text-danger">*</span>
              </label>
              <br />
              <select
                name=""
                id=""
                style={{
                  width: "200px",
                  backgroundColor: "#e7e7e7",
                  color: "black",
                }}
                className="btn btn-secondary border-0"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  const id = AllCatData.find(
                    (item) => item.name === selectedValue
                  )._id;
                  setData({
                    ...data,
                    SuperCatName: selectedValue,
                    SuperCatID: id,
                  });
                  console.log(932, id);
                  getCat(id);
                }}
              >
                <option
                  style={{ background: "white", color: "black" }}
                  value=""
                >
                  Select Category
                </option>
                {AllSuperCat.map((item) => {
                  return (
                    <>
                      <option
                        style={{
                          background: "white",
                          color: "black",
                          textAlign: "left",
                        }}
                        class="dropdown-item"
                        href="#"
                        value={item.name}
                        onChange={(e) => getCat(item._id)}
                      >
                        {item.name}
                      </option>
                    </>
                  );
                })}
              </select>
              {errors.name && data.SuperCatName.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.SuperCatName}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-3">
              <label for="inputCity" class="form-label txt-input ">
                Category <span className="text-danger">*</span>
              </label>
              <br />
              <select
                name=""
                id=""
                style={{
                  width: "200px",
                  backgroundColor: "#e7e7e7",
                  color: "black",
                }}
                className="btn btn-secondary border-0"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  const id = AllCatData.find(
                    (item) => item.name === selectedValue
                  )._id;
                  console.log(963, id);
                  setData({ ...data, CatName: selectedValue, CatID: id });
                  getSubCat(id);
                }}
              >
                <option
                  style={{ background: "white", color: "black" }}
                  value=""
                >
                  Select Category
                </option>
                {AllCat.map((item) => {
                  return (
                    <>
                      <option
                        class="dropdown-item"
                        href="#"
                        style={{
                          background: "white",
                          color: "black",
                          textAlign: "left",
                        }}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    </>
                  );
                })}
              </select>

              {errors.name && data.CatName.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.CatName}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-3">
              <label for="inputCity" class="form-label txt-input">
                Sub Category <span className="text-danger">*</span>
              </label>
              <br />
              <select
                name=""
                id=""
                style={{
                  width: "200px",
                  backgroundColor: "#e7e7e7",
                  color: "black",
                }}
                className="btn btn-secondary border-0"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  const id = AllCatData.find(
                    (item) => item.name === selectedValue
                  )._id;
                  setData({ ...data, SubCatName: selectedValue, SubCatID: id });
                }}
              >
                <option
                  style={{ background: "white", color: "black" }}
                  value=""
                >
                  Select Category
                </option>
                {AllSubCat.map((item) => {
                  return (
                    <>
                      <option
                        style={{
                          background: "white",
                          color: "black",
                          textAlign: "left",
                        }}
                        class="dropdown-item"
                        href="#"
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    </>
                  );
                })}
              </select>

              {errors.name && data.SubCatName.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.SubCatName}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-3">
              <label for="inputCity" class="form-label txt-input">
                Brand Name <span className="text-danger">*</span>
              </label>
              <br />
              <select
                name=""
                id=""
                style={{
                  width: "200px",
                  backgroundColor: "#e7e7e7",
                  color: "black",
                }}
                className="btn btn-secondary border-0"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  const id = AllBrands.find(
                    (item) => item.brand_name === selectedValue
                  )._id;
                  setData({ ...data, BrandName: selectedValue, BrandID: id });
                  console.log("ok");
                }}
              >
                <option
                  style={{ background: "white", color: "black" }}
                  value=""
                >
                  Select Category
                </option>
                {AllBrands.map((item) => {
                  return (
                    <>
                      <option
                        style={{
                          background: "white",
                          color: "black",
                          textAlign: "left",
                        }}
                        class="dropdown-item"
                        href="#"
                        value={item.brand_name}
                        onChange={(e) => getCat(item._id)}
                      >
                        {item.brand_name}
                      </option>
                    </>
                  );
                })}
              </select>
              {errors.name && data.BrandName.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.BrandName}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label
                for="floatingSelect1"
                class="col-form-label  pt-0 txt-input"
              >
                Most Viewed <span className="text-danger">*</span>
              </label>
              <select
                class="form-select"
                id="floatingSelect1"
                aria-label="Floating label select example"
                value={data.IsmostViewed}
                onChange={(e) => {
                  let selectedValue = e.target.value;
                  if (selectedValue === "true") {
                    setData({ ...data, IsmostViewed: true });
                  } else if (selectedValue === "false") {
                    setData({ ...data, IsmostViewed: false });
                  } else {
                    setData({ ...data, IsmostViewed: null });
                  }
                }}
              >
                <option value=""> --Select--</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
              {/* {errors.name && data.IsmostViewed === null ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.IsmostViewed}
            </p>
          ) : (
            ""
          )} */}
            </div>

            <div class="col-lg-4">
              <label
                for="exampleFormControlTextarea1"
                class="form-label txt-input"
              >
                Short Description <span className="text-danger">*</span>
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                value={data.short_desc}
                rows="2"
                onChange={(e) => {
                  setData({ ...data, short_desc: e.target.value });
                  handleInput(e);
                }}
              ></textarea>
              {errors.name && data.short_desc.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.short_desc}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-4">
              <label
                for="exampleFormControlTextarea1"
                class="form-label txt-input"
              >
                Long Description
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                value={data.long_desc}
                rows="2"
                onChange={(e) => {
                  setData({ ...data, long_desc: e.target.value });
                  handleInput(e);
                }}
              ></textarea>
            </div>

            <div class="col-4">
              <label
                for="exampleFormControlTextarea1"
                class="form-label txt-input"
              >
                Additional info{" "}
                <span className="" style={{ fontSize: "12px" }}>
                  (Optional)
                </span>
              </label>
              <textarea
                class="form-control"
                value={data.additional_info}
                id="exampleFormControlTextarea1"
                rows="2"
                onChange={(e) => {
                  setData({ ...data, additional_info: e.target.value });
                  handleInput(e);
                }}
              ></textarea>
            </div>

            <div class="col-md-6">
              <label for="formFileMultiple" class="form-label txt-input">
                Upload Pictures / Files <span className="text-danger"></span>
              </label>
              <input
                class="form-control"
                name="productPictures"
                value={data.productPictures}
                type="file"
                accept="image/png, image/jpeg, video/*"
                id="formFileMultiple"
                multiple
                onChange={(e) => {
                  handleFileChange(e);
                  console.log(863, productPictures);
                  handleImageChange(e);
                }}
              />

              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  className="mx-1 mt-1"
                  alt=""
                  style={{ height: "30px" }}
                />
              ))}
            </div>

            <div class="col-md-2">
              <label for="exampleColorInput" class="form-label txt-input">
                Colour{" "}
              </label>
              <input
                type="color"
                class="form-control form-control-color colorrrs"
                id="exampleColorInput"
                value={data.color}
                onChange={(e) => {
                  setData({ ...data, color: e.target.value });
                  handleInput(e);
                }}
              />
            </div>

            <div class="col-md-4">
              <label for="inputEmail4" class="form-label txt-input">
                Manufacture <span className="text-danger"></span>
              </label>
              <input
                type="text"
                class="form-control"
                value={data.Manufacture}
                id="inputEmail4"
                onChange={(e) => {
                  setData({ ...data, Manufacture: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.Manufacture && data.Manufacture.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.Manufacture}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputCity" class="form-label txt-input">
                Product Type <span className="text-danger"></span>
              </label>
              <input
                type="text"
                class="form-control"
                value={data.Product_Type}
                id="inputCity"
                onChange={(e) => {
                  setData({ ...data, Product_Type: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.Product_Type && data.Product_Type.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.Product_Type}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputCity" class="form-label txt-input">
                Application <span className="text-danger"></span>
              </label>
              <input
                type="text"
                class="form-control"
                value={data.Application}
                id="inputCity"
                onChange={(e) => {
                  setData({ ...data, Application: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.Application && data.Application.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.Application}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputCity" class="form-label txt-input">
                Certifation <span className="text-danger"></span>
              </label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                value={data.Certifation}
                onChange={(e) => {
                  setData({ ...data, Certifation: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.Certifation && data.Certifation.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.Certifation}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputZip" class="form-label txt-input">
                Commercial Warranty <span className="text-danger"></span>
              </label>
              <input
                type="text"
                class="form-control"
                value={data.Commercial_Warranty}
                id="inputZip"
                onChange={(e) => {
                  setData({ ...data, Commercial_Warranty: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.Commercial_Warranty &&
              data.Commercial_Warranty.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.Commercial_Warranty}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputZip" class="form-label txt-input">
                Years <span className="text-danger"></span>
              </label>
              <input
                type="number"
                class="form-control"
                id="inputZip"
                value={data.Years}
                onChange={(e) => {
                  setData({ ...data, Years: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.Years && data.Years.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.Years}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputZip" class="form-label txt-input">
                Core Type Detail <span className="text-danger"></span>
              </label>
              <input
                type="text"
                value={data.Core_Type_Detail}
                class="form-control"
                id="inputZip"
                onChange={(e) => {
                  setData({ ...data, Core_Type_Detail: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.Core_Type_Detail && data.Core_Type_Detail.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.Core_Type_Detail}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputZip" class="form-label txt-input">
                Coverage (sqft)<span className="text-danger"></span>
              </label>
              <input
                type="number"
                class="form-control"
                id="inputZip"
                value={data.Coverage_sqft}
                onChange={(e) => {
                  setData({ ...data, Coverage_sqft: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.Coverage_sqft && data.Coverage_sqft.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.Coverage_sqft}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputZip" class="form-label txt-input">
                Edge Type <span className="text-danger"></span>
              </label>
              <input
                type="text"
                class="form-control"
                id="inputZip"
                value={data.Edge_Type}
                onChange={(e) => {
                  setData({ ...data, Edge_Type: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.Edge_Type && data.Edge_Type.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.Edge_Type}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputZip" class="form-label txt-input">
                Format (in) <span className="text-danger"></span>
              </label>
              <input
                type="number"
                class="form-control"
                value={data.Format_in}
                id="inputZip"
                onChange={(e) => {
                  setData({ ...data, Format_in: e.target.value });
                  handleInput(e);
                }}
              />

              {errors.Format_in && data.Format_in.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.Format_in}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputZip" class="form-label txt-input">
                Length (Cm )<span className="text-danger"></span>
              </label>
              <input
                type="text"
                class="form-control"
                value={data.length_cm}
                id="inputZip"
                onChange={(e) => {
                  setData({ ...data, length_cm: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.length_cm && data.length_cm.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.length_cm}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputCity" class="form-label txt-input">
                Length (in Fraction) <span className="text-danger"></span>
              </label>
              <input
                type="number"
                class="form-control"
                value={data.length_in_fraction}
                id="inputCity"
                onChange={(e) => {
                  setData({ ...data, length_in_fraction: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.length_in_fraction &&
              data.length_in_fraction.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.length_in_fraction}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputCity" class="form-label txt-input">
                Recidential Warranty <span className="text-danger"></span>
              </label>
              <input
                type="text"
                class="form-control"
                value={data.Recidential_warranty}
                id="inputCity"
                onChange={(e) => {
                  setData({ ...data, Recidential_warranty: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.Recidential_warranty &&
              data.Recidential_warranty.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.Recidential_warranty}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputCity" class="form-label txt-input">
                Shape <span className="text-danger"></span>
              </label>
              <input
                type="text"
                class="form-control"
                value={data.Shape}
                id="inputCity"
                onChange={(e) => {
                  setData({ ...data, Shape: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.Shape && data.Shape.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.Shape}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputCity" class="form-label txt-input">
                Underpad Attached <span className="text-danger"></span>
              </label>
              <input
                type="number"
                class="form-control"
                value={data.Underpad_attached}
                id="inputCity"
                onChange={(e) => {
                  setData({ ...data, Underpad_attached: e.target.value });
                  handleInput(e);
                }}
              />
              {errors.Underpad_attached &&
              data.Underpad_attached.length <= 0 ? (
                <p className="text-danger" style={{ fontSize: "14px" }}>
                  {errors.Underpad_attached}
                </p>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-4">
              <label for="inputCity" class="form-label txt-input">
                Manufacturer Color<span className="text-danger"></span>
              </label>
              <input
                type="text"
                class="form-control"
                value={data.Manufacturer_color}
                id="inputCity"
                onChange={(e) => {
                  setData({ ...data, Manufacturer_color: e.target.value });
                  handleInput(e);
                }}
              />
            </div>

            <div class="col-md-12 text-center" style={{ marginTop: 40 }}>
              {id ? (
                <>
                  <button
                    href="/admin/ProductList"
                    type=""
                    class="btn btn-primary fw-bold shadow border-0 p-2"
                    style={{ backgroundColor: "#e67929", width: 120 }}
                    onClick={(e) => {
                      handleFormSubmit(e);
                      updateFormData(e);
                    }}
                  >
                    Update{" "}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type=""
                    class="btn btn-primary fw-bold shadow border-0 p-2"
                    style={{ backgroundColor: "#e67929", width: 115 }}
                    onClick={(e) => {
                      handleFormSubmit(e);
                    }}
                  >
                    Submit
                  </button>
                </>
              )}
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Products;
